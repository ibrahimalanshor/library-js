export default {
  async get({ rootState: { http } }, { name = '', page }) {
    const racks = await http.get('/rack', {
      params: {
        search: name,
        page
      }
    })

    return racks.data
  },
  async find({ rootState: { http }}, { slug, title = '', page }) {
    const results = await http.get(`/rack/${slug}`, {
      params: {
        search: title,
        page
      }
    })

    return results.data
  }
}