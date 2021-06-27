<template>
  <section class="section">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <b-skeleton width="200px" height="25px" v-if="loading" />
            <h2 class="title" v-else>{{ heading }}</h2>
          </div>
        </div>

        <div class="level-right">
          <div class="level-item">
            <b-input placeholder="Search" icon="search" v-model="title" />
          </div>
        </div>
      </nav>

      <div class="columns is-multiline" v-if="loading">
        <div class="column is-3" v-for="n in 4" :key="n">
          <b-skeleton height="200px"></b-skeleton>
        </div>
      </div>

      <div v-else>
        <div class="columns is-multiline" v-if="books.totalDocs">
          <card v-for="(book, key) in books.docs" :key="key" :book="book" />
        </div>
        <div v-else>
          No Result
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'
  import { Card } from '@/components/book'

  export default {
    components: {
      Card
    },
    data() {
      return {
        title: this.$route.query.title,
        loading: true,
        rack: null,
        books: [],
      }
    },
    computed: {
      heading() {
        return  this.title ? `Search "${this.title}" in ${this.rack.name}` : this.rack.name 
      }
    },
    watch: {
      async title(title) {
        this.$router.push({ query: { title } })

        await this.setRack()
      }
    },
    methods: {
      ...mapActions('rack', ['find']),
      async setRack() {
        try {
          this.loading = true

          const { rack, books } = await this.find({
            slug: this.$route.params.slug,
            title: this.title
          })

          this.rack = rack
          this.books = books

          this.loading = false
        } catch (err) {
          this.$router.push({ name: 'NotFound' })
        }
      }
    },
    async mounted() {
      await this.setRack()

      this.$Progress.finish()
    }
  }
</script>