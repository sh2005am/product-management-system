import express from 'express'
import dotenv from 'dotenv'
import connectDB  from './config/config.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
dotenv.config()
connectDB()

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/products/:id', productRoutes )
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
