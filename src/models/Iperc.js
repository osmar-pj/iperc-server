import { Schema, model } from 'mongoose'

const ipercSchema = new Schema(
    {
        danger: String,
        risk: String,
        control: String,
        point: Number,
        task:{
            type: Schema.Types.ObjectId,
            ref: 'Task'
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt',
            // timezone: 'America/Lima'
        },
        versionKey: false
    }
)

export default model('Iperc', ipercSchema)