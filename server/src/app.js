import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: (origin, callback) => {
            callback(null, origin);
        },
        credentials: true
    })
)

app.use(express.json({ limit: '30kb' }))
app.use(express.urlencoded({ extended: true, limit: '30kb' }))
app.use(express.static("public"))
app.use(cookieParser())


// import routes
import userRouter from "./routes/user.routes.js"
import adminRouter from "./routes/admin.routes.js"
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'
import reviewRouter from './routes/review.routes.js'

// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/products", productRouter)
app.use('/api/v1/orders', orderRouter)
app.use('/api/v1/reviews', reviewRouter)


export default app