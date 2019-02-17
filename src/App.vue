<template>
  <div id="app">
    <app-header/>
    <main class="main">
      <transition name="fade" mode="out-in" appear>
        <router-view :key="$route.fullPath" />
      </transition>
    </main>
    <app-footer/>
  </div>
</template>

<script>
  require('normalize.css')

  import AppHeader from '@/components/Header'
  import AppFooter from '@/components/Footer'

  export default {
    name: 'app',
    components: {
      AppHeader,
      AppFooter
    }
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  #app {
    font-family: -apple-system,
                  BlinkMacSystemFont,
                  "Segoe UI",
                  Roboto,
                  Oxygen-Sans,
                  Ubuntu,
                  Cantarell,
                  "Helvetica Neue",
                  sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .main {
    min-height: 100vh;
    padding: 20px 0;
  }

  .container {
    width: 90%;
    max-width: 1000px;
    margin: auto;
  }

  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>
