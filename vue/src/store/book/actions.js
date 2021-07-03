export default {
  async get({ rootState: { http } }, { title = '', page }) {
    const books = await http.get('/book', {
      params: {
        search: title,
        page
      }
    })

    return books.data
  },
  async find({ rootState: { http }}, isbn) {
    const book = await http.get(`/book/${isbn}`)

    return book.data
  }
}