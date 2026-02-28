import mongoose from 'mongoose';

const patientProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
            unique: true
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            enum: ['Male', 'Female', 'Other'],
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        address: {
            street: String,
            city: String,
            state: String,
            zipCode: String,
        },
        bloodGroup: {
            type: String,
        },
        allergies: [{
            type: String,
        }],
        medicalHistorySummary: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
);

const PatientProfile = mongoose.model('PatientProfile', patientProfileSchema);

export default PatientProfile;
