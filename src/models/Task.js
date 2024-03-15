import { Schema, model } from 'mongoose'

const taskSchema = new Schema(
    {
        description: String,
        routine: String,
        work: {
            type: Schema.Types.ObjectId,
            ref: 'Work'
        },
        iperc: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Iperc'
            }
        ],
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

export default model('Task', taskSchema)