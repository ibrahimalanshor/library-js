<template>
  <div>
    <b-navbar type="is-primary" wrapper-class="container">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
          <b-icon pack="fas" icon="university" />
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-item tag="router-link" :to="{ name: 'Book'}" :active="active === 'Book'">Book</b-navbar-item>
        <b-navbar-item tag="router-link" :to="{ name: 'Rack'}" :active="active === 'Rack'">Rack</b-navbar-item>
      </template>

      <template #end>
        <b-navbar-item tag="div">
          <b-button tag="router-link" :to="{ name: 'Book'}" icon-left="search" type="is-primary" inverted>Search</b-button>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        search: this.$route.query.title
      }
    },
    watch: {
      async search(search) {
        this.$router.push({ name: 'Book', query: { title: search } })
      }
    },
    computed: {
      active() {
        return this.$route.name
      }
    }
  }
</script>