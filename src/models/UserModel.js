const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
    name: {type: String},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    isAdmin: {type: Boolean, default: false, required: true},
    phone: {type: Number},
    address: {type: String, require: true},
    avatar: {type: String},
    city: {type: String}

},
{
    timestamps: true
}
);
const User = mongoose.model("User", userSchema);
module.exports= User;