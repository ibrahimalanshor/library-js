<template>
  <section class="section">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <nav class="breadcrumb">
              <ul>
                <li><router-link :to="{ query: {} }">Semua Rak</router-link></li>
                <li class="is-active" v-if="page"><a href="#">Halaman {{ page }}</a></li>
                <li class="is-active" v-if="name"><a href="#">Cari "{{ name }}"</a></li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <b-input icon="search" placeholder="Search" v-model="name" />
          </div>
        </div>
      </nav>

      <div class="columns is-multiline" v-if="loading">
        <div class="column is-2" v-for="n in 6" :key="n">
          <b-skeleton height="80px" />
        </div>
      </div>

      <div v-else>
        <div v-if="racks.totalDocs">
          <div class="columns is-multiline">
            <card v-for="(rack, key) in racks.docs" :key="key" :rack="rack" />
          </div>

          <nav class="pagination">
            <router-link :to="{ query: { name: name, page: racks.prevPage } }" class="pagination-previous" v-if="racks.hasPrevPage">Prev</router-link>
            <router-link :to="{ query: { name: name, page: racks.nextPage } }" class="pagination-next" v-if="racks.hasNextPage">Next</router-link>

            <ul class="pagination-list">
              <li v-for="(page, key) in racks.totalPages" :key="key">
                <router-link :to="{ query: { name: name, page } }" class="pagination-link" :class="{ 'is-current': racks.page === page }">{{ page }}</router-link>
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
  import { Card } from '@/components/rack'

  export default {
    components: {
      Card
    },
    data() {
      return {
        loading: true,
        name: this.$route.query.name,
        page: this.$route.query.page,
        racks: [],
      }
    },
    watch: {
      async name(name) {
        this.$router.push({ query: { name }})
        
        await this.setRack()
      },
      async page() {        
        await this.setRack()
      },
      '$route.query.page': async function (page) {
        this.page = page
      },
      '$route.query.name': async function (name) {
        this.name = name
      },
      '$route.query': async function () {
        this.setTitle()
      }
    },
    methods: {
      ...mapActions('rack', ['get']),

      async setRack() {
        this.loading = true
        
        this.racks = await this.get({
          name: this.name,
          page: this.page
        })

        this.loading = false
      },
      setTitle() {
        let title = 'Rack - '

        if (this.name && this.page) {
          title += `Search "${this.name}" in Page ${this.page}`
        } else if (this.name) {
          title += `Search "${this.name}"`
        } else if (this.page) {
          title += `Page ${this.page}`
        } else {
          title += 'All Rack'
        }

        document.title = title
      }
    },
    created() {
      this.setTitle()
    },
    async mounted() {
      await this.setRack()

      this.$Progress.finish()
    }
  }
</script>