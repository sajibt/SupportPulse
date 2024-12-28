import mongoose from 'mongoose';
import { randomBytes, createHash } from 'node:crypto';
// import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['admin', 'manager', 'user'], default: 'user' },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    createdAt: { type: Date, default: Date.now }
});


// Method to compare password
// userSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };


userSchema.methods.createResetPasswordToken = function() {
    const resetToken = randomBytes(32).toString('hex');
    this.resetPasswordToken = createHash('sha256')
        .update(resetToken)
        .digest('hex');
    this.resetPasswordExpire = Date.now() + 3600000;
    return resetToken;
};

export default mongoose.model('User', userSchema);
