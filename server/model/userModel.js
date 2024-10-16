import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    sector: {
        type : String,
        required : true
    },
    address: {
        type : String,
        required : true
    },
    salary: {
        type : String,
        required : true
    },
    mobile: {
        type : String,
        required : true
    }
})


export default mongoose.model("User", userSchema);