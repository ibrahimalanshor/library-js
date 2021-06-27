const { Schema } = require('mongoose')
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')
const methods = require('./methods')

const RackSchema = new Schema({
  name: String,
  slug: String,
  location: String
}, { timestamps: true })

for (let [name, method] of Object.entries(methods)) {
  RackSchema.methods[name] = method
}

RackSchema.pre('save', async function () {
  await this.slugify()
})

RackSchema.plugin(aggregatePaginate)

module.exports = RackSchema