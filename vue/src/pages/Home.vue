<template>
  <section class="section">
    <div class="container">
      <h2 class="title">Popular Books</h2>

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
         No Books
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
        books: []
      }
    },
    methods: {
      ...mapActions('book', ['get']),
      async setBook() {
        this.books = await this.get({
          search: ''
        })
      }
    },
    async mounted() {
      await this.setBook()

      this.$Progress.finish()
      this.loading = false
    }
  }
</script>