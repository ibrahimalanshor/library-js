<template>
  <section class="section">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <nav class="breadcrumb">
              <ul>
                <li><router-link :to="{ query: {} }">Semua Buku</router-link></li>
                <li class="is-active" v-if="page"><a href="#">Halaman {{ page }}</a></li>
                <li class="is-active" v-if="title"><a href="#">Cari "{{ title }}"</a></li>
              </ul>
            </nav>
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
        <div v-if="books.totalDocs">
          <div class="columns is-multiline mb-5">
            <card v-for="(book, key) in books.docs" :key="key" :book="book" />
          </div>

          <nav class="pagination">
            <router-link :to="{ query: { title: title, page: books.prevPage } }" class="pagination-previous" v-if="books.hasPrevPage">Prev</router-link>
            <router-link :to="{ query: { title: title, page: books.nextPage } }" class="pagination-next" v-if="books.hasNextPage">Next</router-link>

            <ul class="pagination-list">
              <li v-for="(page, key) in books.totalPages" :key="key">
                <router-link :to="{ query: { title: title, page } }" class="pagination-link" :class="{ 'is-current': books.page === page }">{{ page }}</router-link>
              </li>
            </ul>
          </nav>
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
        page: this.$route.query.page,
        books: []
      }
    },
    watch: {
      async title(title) {
        this.$router.push({ query: { title }})
        
        await this.setBook()
      },
      async page() {        
        await this.setBook()
      },
      '$route.query.page': async function (page) {
        this.page = page
      },
      '$route.query.title': async function (title) {
        this.title = title
      },
      '$route.query': async function () {
        this.setTitle()
      }
    },
    methods: {
      ...mapActions('book', ['get']),
      async setBook() {
        this.loading = true

        this.books = await this.get({
          title: this.title,
          page: this.page
        })

        this.loading = false
      },
      setTitle() {
        let title = 'Book - '

        if (this.title && this.page) {
          title += `Search "${this.title}" in Page ${this.page}`
        } else if (this.title) {
          title += `Search "${this.title}"`
        } else if (this.page) {
          title += `Page ${this.page}`
        } else {
          title += 'All Book'
        }

        document.title = title
      }
    },
    created() {
      this.setTitle()
    },
    async mounted() {
      await this.setBook()

      this.$Progress.finish()
    }
  }
</script>