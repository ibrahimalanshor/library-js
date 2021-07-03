<template>
  <div id="app">    
    <vue-progress-bar></vue-progress-bar>

    <heading v-if="$route.meta.home" />
    <navbar v-else />

    <router-view></router-view>

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Library</strong> by <a href="https://ibrahimalanshor.github.io">ibrahim akiller</a> The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
      is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>
        </p>
      </div>
    </footer>
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

      if (this.$route.meta.title) {
        document.title = this.$route.meta.title
      }

      this.$router.beforeEach((to, from, next) => {
        if (to.name !== from.name) {
          this.$Progress.start()
        }

        if (to.meta.title) {
          document.title = to.meta.title
        }

        next()
      })
    }
  }
</script>