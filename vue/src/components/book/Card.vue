<template>
  <div class="column is-3">
    <div class="card">
      <div class="card-image">
        <figure class="image is-5by3">
          <img :src="book.cover" alt="">
        </figure>
      </div>
      <div class="card-content">
        <div class="content">
          <router-link :to="{ name: 'Read', params: { book: book.isbn } }"><h5>{{ book.title }}</h5></router-link>

          <p>{{ excerpt }}</p>

          <div class="mb-2">
            <b-taglist attached>
              <b-tag type="is-warning">{{ book.rack.name }}</b-tag>
              <b-tag type="is-dark">{{ book.rack.location }}</b-tag>
            </b-taglist>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['book'],
    computed: {
      excerpt() {
        const description = this.book.description.split(' ')
        
        if (description.length > 9) {
          description.splice(8)
          description[description.length - 1] += '...'
        }

        return description.join(' ')
      }
    }
  }
</script>