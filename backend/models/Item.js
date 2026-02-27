import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String, // Cloudinary URL
        },
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
