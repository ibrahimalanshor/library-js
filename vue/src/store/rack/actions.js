export default {
  async get({ rootState: { http } }, { name = '' }) {
    const racks = await http.get('/rack', {
      params: {
        search: name
      }
    })

    return racks.data
  },
  async find({ rootState: { http }}, { slug, title = '' }) {
    const results = await http.get(`/rack/${slug}`, {
      params: {
        search: title
      }
    })

    return results.data
  }
}