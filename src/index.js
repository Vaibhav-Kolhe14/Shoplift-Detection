require('dotenv').config()
const connectDB = require('./db/connectDB')
const { app } = require('./app.js')

const PORT = process.env.PORT || 3001

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch((error) => {
    console.log("Mongo DB Connection Failed...! :: ", err);
})
