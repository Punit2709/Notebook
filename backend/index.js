const connectToMongo = require('./db.js')
const cors = require('cors')
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// linking routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.get('/', (req, res) => {
    res.send('Notebook App Server is running')
})

app.listen(port, () => {
    console.log(`Note book listening on port ${port}`)
})