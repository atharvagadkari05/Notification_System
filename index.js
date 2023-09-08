import express from 'express'
import dotenv from 'dotenv'
import queueRoutes from './routes/notification.js'

const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())
dotenv.config()

app.use('/' , queueRoutes)

app.listen(PORT, ()=>{
    console.log(`Listening at ${PORT}`)
})