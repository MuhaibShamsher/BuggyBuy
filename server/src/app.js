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

// routes
app.use("/api/v1/users", userRouter)


export default app