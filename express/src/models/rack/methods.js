const { slugify } = require('../../helpers')

module.exports = {
  slugify: async function () {
    this.slug = slugify(this.name)
  }
}