export default function(context, inject) {
  let isLoaded = false
  let waiting = []

  addScript()

  inject('maps', {
    showMap,
    makeAutoComplete, 
  })
  
  function addScript() {
    const script = document.createElement('script')
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyD1nQpztvVGCUB_gG6gxfqcBFJZz2Eib6k&libraries=places&callback=initGoogleMaps"
    script.async = true
    window.initGoogleMaps = initGoogleMaps
    document.head.appendChild(script)
  }
  
  function initGoogleMaps() {
    isLoaded = true
    waiting.forEach((item) => {
      if(typeof item.fn === 'function') {
        item.fn(...item.arguments)
      }
    })
    waiting = []
  }

  function makeAutoComplete(input) {
    if(!isLoaded) {
      waiting.push({
        fn: makeAutoComplete,
        arguments
      })
      return
    }

    const autoComplete = new window.google.maps.places.Autocomplete(input, { types: ['(cities)']})
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  function showMap(canvas,lat,lng,markers) {
    console.log('showMap fired')
    if(!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments
      })
      return
    }
    console.log('Google data loaded')
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(lat, lng),
      disableDefaultUI: true,
      zoomControl: true
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    if (!markers) {
      const position = new window.google.maps.LatLng(lat, lng)
      const marker = new window.google.maps.Marker({ position })
      marker.setMap(map)
      return 
    }

    const bounds = new window.google.maps.LatLngBounds()
    markers.forEach((home) => {
      const position = new window.google.maps.LatLng(home.lat, home.lng)
      const marker = new window.google.maps.Marker({ 
        position,
        label: {
          text: `$${home.pricePerNight}`,
          className: 'marker'
        },
        icon: 'https://maps.gstatic.com/mapfiles/transparent.png',

      })
      marker.setMap(map)
      bounds.extend(position)
    })

    map.fitBounds(bounds)
  }

}