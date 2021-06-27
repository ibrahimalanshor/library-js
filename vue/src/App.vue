<template>
  <div id="app">    
    <vue-progress-bar></vue-progress-bar>

    <heading v-if="$route.meta.home" />
    <navbar v-else />

    <router-view></router-view>
  </div>
</template>

<script>
  import { Heading, Navbar } from '@/components'

  export default {
    components: {
      Heading,
      Navbar
    },
    created() {
      this.$Progress.start()

      this.$router.beforeEach((to, from, next) => {
        if (to.name !== from.name) {
          this.$Progress.start()
        }

        next()
      })
    }
  }
</script>