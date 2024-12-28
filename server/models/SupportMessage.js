import mongoose from 'mongoose';

const supportMessageSchema = new mongoose.Schema({
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const SupportMessage = mongoose.model('SupportMessage', supportMessageSchema);

export default SupportMessage;

