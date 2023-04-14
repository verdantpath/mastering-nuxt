<template>
  <div style="text-align: center;">
    <img src="https://media.tenor.com/ZRKlPRoS30cAAAAd/alf-thats-not-what-i-wrote.gif">
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>
<script>
  export default {
    head() {
      return {
        title: 'Big problemo'
      }
    },
    props: {
      error: {
        type: Object,
        required: true, 
      }
    }
  }
</script>
<style>

</style>