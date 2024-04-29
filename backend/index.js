const connectToMongo = require('./db.js')
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// linking routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
    res.send('Hello Punit')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})