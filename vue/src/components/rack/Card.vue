<template>
  <div class="column is-2">
    <router-link :to="{ name: 'RackView', params: { slug: rack.slug } }">
      <div class="box" :class="bg()">
        <p><b>{{ rack.name }}</b></p>
        <small>
          Total Book : {{ rack.booksCount }}
        </small>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ['rack'],
    methods: {
      bg() {
        const bg = [
          'has-background-dark has-text-white',
          'has-background-primary has-text-white',
          'has-background-link has-text-link-light',
          'has-background-info has-text-info-light',
          'has-background-success has-text-success-light',
          'has-background-warning has-text-warning-dark',
          'has-background-danger has-text-danger-light',
        ]

        return bg[Math.round(Math.random() * 6)]
      }
    }
  }
</script>