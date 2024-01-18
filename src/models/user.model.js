import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true // * Sirve para limpiar el codigo de espacios no deseados para que no se guarden
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    }
)

export default mongoose.model('User', userSchema)