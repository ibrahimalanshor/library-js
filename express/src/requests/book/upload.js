const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../../../public/book_cover/'),
  filename: (req, file, cb) => {
    const isbn = req.body.isbn
    const ext = path.extname(file.originalname)
    const date = Date.now()

    const filename = `${isbn}-${date}${ext}`

    req.body.cover = filename
    
    cb(null, filename)
  }
})

module.exports = multer({ storage }).single('cover')