const mongoose=require('mongoose')
const colors=require('colors')

//mongoDB database connection
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`connect to database ${mongoose.connection.host}`.white.bgMagenta)
    } catch (error) {
        console.log('Database error'.white.bgRed,error )
    }
 }

 module.exports=connectDb;
