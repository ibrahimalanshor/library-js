<template>
  <section class="section">
    <div class="container">
      <h1 class="title">Page Not Found</h1>
      <p class="subtitle">Your requested page not found</p>

      <hr>

      <b-button type="is-primary" tag="router-link" :to="{ name: 'Home' }">Go Home</b-button>
    </div>
  </section>
</template>