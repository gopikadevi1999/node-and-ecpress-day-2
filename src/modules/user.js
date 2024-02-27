import mongoose from "./index.js"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, 'Email is required'],
        validate:{
            validator: function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            },
            message: props => `${props.value} is not a valid email`

            
        }
        
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: String,
        default: "user"
    },
    status: {
        type: Boolean,
        default: true
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    
})

const userModel = mongoose.model("user", userSchema)

export default userModel
