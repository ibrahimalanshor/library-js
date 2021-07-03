<template>
  <section class="section">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <nav class="breadcrumb">
              <ul>
                <li><router-link :to="{ name: 'Rack', query: {} }">Rak</router-link></li>
                <li v-if="rack"><router-link :to="{ params: { slug: rack.slug } }">{{ rack.name }}</router-link></li>
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
  import { mapActions } from 'vuex'
  import { Card } from '@/components/book'

  export default {
    components: {
      Card
    },
    data() {
      return {
        title: this.$route.query.title,
        page: this.$route.query.page,
        loading: true,
        rack: null,
        books: [],
      }
    },
    watch: {
      async title(title) {
        this.$router.push({ query: { title }})
        
        await this.setRack()
      },
      async page() {        
        await this.setRack()
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
      ...mapActions('rack', ['find']),
      async setRack() {
        try {
          this.loading = true

          const { rack, books } = await this.find({
            slug: this.$route.params.slug,
            title: this.title,
            page: this.page
          })

          this.rack = rack
          this.books = books

          this.loading = false
        } catch (err) {
          this.$router.push({ name: 'NotFound' })
        }
      },
      setTitle() {
        let title = this.rack ? `${this.rack.name} - ` : 'Book - '

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
    async mounted() {
      await this.setRack()
      
      this.setTitle()
      this.$Progress.finish()
    }
  }
</script>