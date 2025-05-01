import connectDB from "./db/index.js"
import app from "./app.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => console.log(`Server running on Port ${process.env.PORT}`));
})
.catch((err) => {
    console.log(`DB connection failed: ${err}`);
})