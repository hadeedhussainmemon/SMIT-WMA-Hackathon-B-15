import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Appointment',
        },
        diagnosis: {
            type: String,
            required: true,
        },
        medicines: [
            {
                name: { type: String, required: true },
                dosage: { type: String, required: true },
                duration: { type: String, required: true },
                instructions: { type: String }
            }
        ],
        notes: {
            type: String,
        },
        pdfUrl: {
            type: String, // Cloudinary URL
        }
    },
    {
        timestamps: true,
    }
);

const Prescription = mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
