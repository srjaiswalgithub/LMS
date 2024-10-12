import {Schema,model} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const userSchema = new Schema({
    fullname:{
        type:String,
        required: [true, 'Name is required'],
        maxlength:20,
        minlength: [5, 'Name must be at least 5 characters'],
        // lowercase: true,
        trim: true // Removes unnecessary spaces

    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        // lowercase: true,
        match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please fill in a valid email address',
        ], // Matches email against regex
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // Will not select password upon looking up a document
    },
    subscription: {
        type:String,
        enum:['inactive','active'],
        default:'inactive'

        
    },
    avatar:{
        public_id:{
            type:String
        },
        secure_url:{
            type:String,
        },

    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    forgotpasswordToken:String,
    forgotpasswordExpiry:Date,

},{timestamps:true});

//to hash the password
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods = {

    //compare password...
    comparePassword:async function(plainpassword){
        return await bcrypt.compare(plainpassword,this.password);
    },

    //generate JWT token...
    jwtToken:async function(){
        return await jwt.sign({id:this._id,email:this.email,role:this.role,subscription:this.subscription},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRY});
    },

    // This will generate a token for password reset
    generatePasswordResetToken:async function(){
        // creating a random token using node's built-in crypto module
        const resetToken = await crypto.randomBytes(20).toString('hex');

        // Again using crypto module to hash the generated resetToken with sha256 algorithm and storing it in database
        this.forgotpasswordToken  = crypto.createHash('sha256').update(resetToken).digest('hex');

        // Adding forgot password expiry to 15 minutes
        this .forgotpasswordExpiry  = Date.now()+15*60*1000;
        return resetToken;
    }

};



const usermodel = model('lms_user',userSchema);
export default usermodel;