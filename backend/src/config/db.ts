import mongoose from "mongoose"
import colors from "colors"

console.log(process.env.MONGO_URI)

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_URI as string)
        const url2 = `${connection.host}:${connection.port}`
        console.log(colors.cyan.bold(`Mongo conectado en ${url2}`))
    } catch (error) {
        console.error(colors.bgRed.white.bold(error.message))
        process.exit(1)
    }
}