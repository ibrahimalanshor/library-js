<template>
  <section class="hero is-primary is-medium">
    <div class="hero-head">
      <navbar />
    </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Library</h1>
        <h2 class="subtitle">Search book, by rack, view book</h2>
      </div>
    </div>
  </section>
</template>

<script>
  import Navbar from './Navbar'

  export default {
    components: {
      Navbar
    }
  }
</script>