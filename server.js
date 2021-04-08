const express = require('express')
const app = express()
const port = 80

const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static/img')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

app.use('/', express.static('static'));

var upload = multer({ storage: storage })
app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


