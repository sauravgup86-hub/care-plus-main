import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4000
connectCloudinary()

// middlewares
app.use(express.json())
const allowedOrigins = process.env.CLIENT_URLS
  ?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean)

app.use(cors({
  origin: allowedOrigins?.length
    ? (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin))
    : true,
}))

// api endpoints
app.get("/", (req, res) => {
  res.send("API Working")
})

app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    next(error)
  }
})

app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

if (!process.env.VERCEL) {
  app.listen(port, () => console.log(`Server started on PORT:${port}`))
}

export default app