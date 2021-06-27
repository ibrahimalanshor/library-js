<template>
  <section class="section">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h2 class="title">{{ heading }} <span v-if="!loading">({{ books.totalDocs }})</span></h2>
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
  import { Card } from '@/components/book'
  import { mapActions } from 'vuex'
  
  export default {
    components: {
      Card
    },
    data() {
      return {
        loading: true,
        title: this.$route.query.title,
        books: []
      }
    },
    computed: {
      heading() {
        return this.title ? `Search "${this.title}"` : 'All Books'
      }
    },
    watch: {
      async title(title) {
        this.$router.push({ query: { title }})
        
        await this.setBook()
      }
    },
    methods: {
      ...mapActions('book', ['get']),
      async setBook() {
        this.loading = true

        this.books = await this.get({
          title: this.title
        })

        this.loading = false
      }
    },
    async mounted() {
      await this.setBook()

      this.$Progress.finish()
    }
  }
</script>