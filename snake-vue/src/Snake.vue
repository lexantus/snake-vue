<template>
  <div id="snake-app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Snake'
}
</script> 

<style>
    html,
    body,
    #snake-app {
        margin: 0;
        padding: 0;
        width: calc(100%);
        height: calc(100%);
        overflow: hidden;
    }

    body {
        background: black;
    }
</style>
