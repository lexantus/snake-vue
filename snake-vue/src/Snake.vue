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
    }

    body,
    #snake-app {
        width: calc(100%);
        height: calc(100%);
    }

    body {
        background: black;
        overflow-x: hidden;
        overflow-y: auto;
    }

    #snake-app {
        overflow: hidden;
    }
</style>
