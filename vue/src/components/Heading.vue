<template>
  <section class="hero is-primary is-medium">
    <div class="hero-head">
      <navbar />
    </div>
    <div class="hero-body">
      <div class="container">
        <h1 class="title">Library</h1>
        <h2 class="subtitle">Search book, list of all, make loan, extend and return</h2>
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