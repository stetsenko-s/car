import express from 'express'
import path from "path";
// const MongoClient = require('mongodb').MongoClient

const __dirname = path.resolve()
const PORT = 3000
const app = express()

app.use('/styles', express.static(__dirname + '/styles'))
app.use('/', express.static(__dirname))

// fetch('mongodb+srv://semyon:FDUhf;lfycre.DjqyeJyCgfc@cluster0.rgtbo.mongodb.net/?retryWrites=true&w=majority')
//     .then(r => {
//         console.log(r)
//     })

app.listen(PORT, function () {
    console.log('Server is worked....')
})