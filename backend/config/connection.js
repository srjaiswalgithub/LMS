import mongoose from 'mongoose';
import {config} from 'dotenv';
config();
mongoose.set("strictQuery",false);

const connectionDB = async()=>{
    try{
        const {connection} = await mongoose.connect(process.env.DATABASE_URL);

        if(connection){
            console.log(`database connected....`)
        }
    }
    catch(err){
        console.log("error in connecting to database!!");
        
        process.exit(1);
    }
    

    
};
export default connectionDB;

