import mongoose from "mongoose"


export const dbconnection = () =>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName:"MERC_STACK_CONSULTORIOS_MEDICAL_MEXICO"
    }).then(()=>{
        console.log("Connected to Database")

    }).catch(err =>{
        console.log(`Some error occured while connecting to database: ${err}`)
    })
}