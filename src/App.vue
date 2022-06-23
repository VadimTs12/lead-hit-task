<template>
  <nav class="p-2 uppercase flex justify-center">
    <router-link to="/" class="p-2 hover:bg-blue-600 hover:text-white rounded-md duration-300 bg-blue-400 text-black mx-2">Авторизация</router-link>
    <router-link to="/analytics"  class="p-2 hover:bg-blue-600 hover:text-white rounded-md duration-300 bg-blue-400 text-black mx-2">Аналитика</router-link>
  </nav>
  <router-view/>
</template>
<script>
import './index.css'
export default {
  name: 'App'
}
</script>
<style lang="scss">


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
