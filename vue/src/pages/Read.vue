<template>
  <section class="section">
    <div class="container">
      <div v-if="loading">
        <div class="mb-4">
          <b-skeleton width="350px" size="is-large"></b-skeleton>
        </div>

        <div class="columns is-multiline">
          <div class="column" v-for="n in 2" :key="n">
            <b-skeleton height="400px"></b-skeleton>
          </div>
        </div>
      </div>

      <div v-else>
        <nav class="breadcrumb">
          <ul>
            <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
            <li><router-link :to="{ name: 'RackView', params: { slug: book.rack.slug } }">{{ book.rack.name }}</router-link></li>
            <li class="is-active"><a href="#">{{ book.title }}</a></li>
          </ul>
        </nav>

        <div class="columns is-multiline">
          <div class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image">
                  <img :src="book.cover" alt="">
                </figure>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="box content">
              <h1>{{ book.title }}</h1>

              <b-taglist attached>
                <b-tag type="is-warning">{{ book.rack.name }}</b-tag>
                <b-tag type="is-dark">{{ book.rack.location }}</b-tag>
              </b-taglist>

              <p v-html="book.description"></p>

              <hr>

              <dl class="columns is-multiline">
                <dt class="column is-4"><b>ISBN</b></dt>
                <dd class="column is-7">{{ book.isbn }}</dd>
                <dt class="column is-4"><b>Author</b></dt>
                <dd class="column is-7">{{ book.author }}</dd>
                <dt class="column is-4"><b>Publisher</b></dt>
                <dd class="column is-7">{{ book.publisher }}</dd>
                <dt class="column is-4"><b>Year</b></dt>
                <dd class="column is-7">{{ book.year }}</dd>
                <dt class="column is-4"><b>Stock</b></dt>
                <dd class="column is-7">{{ book.stock }}</dd>
                <dt class="column is-4"><b>Rack - Location</b></dt>
                <dd class="column is-7">{{ book.rack.name }} - {{ book.rack.location }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        loading: true,
        book: null
      }
    },
    methods: {
      ...mapActions('book', ['find']),
      async setBook() {
        try {
          const book = await this.find(this.$route.params.book)

          if (!book) throw 'Err'

          this.book = book
        } catch (err) {
          this.$router.push({ name: 'NotFound' })
        }
      },
      setTitle() {
        document.title = this.book.title
      }
    },
    async mounted() {
      await this.setBook()

      this.setTitle()

      this.$Progress.finish()
      this.loading = false
    }
  }
</script>