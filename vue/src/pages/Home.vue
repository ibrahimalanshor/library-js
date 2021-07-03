<template>
  <div>
    <section class="section">
      <div class="container">
        <h2 class="title">Latest Books</h2>

        <div class="columns is-multiline" v-if="loading.book">
          <div class="column is-3" v-for="n in 4" :key="n">
            <b-skeleton height="200px"></b-skeleton>
          </div>
        </div>

        <div v-else>
         <div class="columns is-multiline" v-if="books.totalDocs">
           <book v-for="(book, key) in books.docs" :key="key" :book="book" />
         </div>
         <div v-else>
           No Books
         </div>
       </div>
      </div>
    </section>

    <section class="section has-background-light">
      <div class="container">
        <h2 class="title">Popular Rack</h2>

        <div class="columns is-multiline" v-if="loading.rack">
          <div class="column is-2" v-for="n in 6" :key="n">
            <b-skeleton height="80px" />
          </div>
        </div>

        <div v-else>
          <div class="columns is-multiline" v-if="racks.totalDocs">
            <rack v-for="(rack, key) in racks.docs" :key="key" :rack="rack" />
          </div>
          <div v-else>
            No Result
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { Card as Book } from '@/components/book'
  import { Card as Rack } from '@/components/rack'
  import { mapActions } from 'vuex'
  
  export default {
    components: {
      Book,
      Rack
    },
    data() {
      return {
        loading: {
          book: true,
          rack: true
        },
        books: [],
        racks: [],
      }
    },
    methods: {
      ...mapActions('book', {
        getBook: 'get'
      }),
      ...mapActions('rack', {
        getRack: 'get'
      }),
      async setBook() {
        this.books = await this.getBook({
          search: ''
        })

        this.loading.book = false
      },
      async setRack() {
        this.racks = await this.getRack({
          search: ''
        })

        this.loading.rack = false
      }
    },
    async mounted() {
      await this.setBook()
      await this.setRack()

      this.$Progress.finish()
    }
  }
</script>