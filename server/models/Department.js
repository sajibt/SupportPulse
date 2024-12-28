// Department Model
import mongoose from 'mongoose';

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
}, { timestamps: true });

const Department = mongoose.model('Department', departmentSchema);

export default Department;

