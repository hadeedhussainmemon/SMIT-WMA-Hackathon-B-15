import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
    {
        // For a multi-tenant clinic system, the admin user represents the clinic
        clinicAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        planTier: {
            type: String,
            enum: ['Free', 'Pro'],
            default: 'Free',
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
        },
        isActive: {
            type: Boolean,
            default: true,
        }
    },
    {
        timestamps: true,
    }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
