<template>
  <section class="section">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <h2 class="title">{{ heading }} <span v-if="!loading">({{ racks.totalDocs }})</span></h2>
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
        <div class="columns is-multiline" v-if="racks.totalDocs">
          <card v-for="(rack, key) in racks.docs" :key="key" :rack="rack" />
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
        racks: [],
      }
    },
    computed: {
      heading() {
        return this.name ? `Search "${this.name}"` : 'All Rack'
      }
    },
    watch: {
      async name(name) {
        this.$router.push({ query: { name }})
        
        await this.setRack()
      }
    },
    methods: {
      ...mapActions('rack', ['get']),

      async setRack() {
        this.loading = true
        
        this.racks = await this.get({
          name: this.name
        })

        this.loading = false
      }
    },
    async mounted() {
      await this.setRack()

      this.$Progress.finish()
    }
  }
</script>