module.exports = (folder, path) => {
  const app = process.env.APP_URL

  return `${app}/public/${folder}/${path}`
}