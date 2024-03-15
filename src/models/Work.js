import { Schema, model } from 'mongoose'

const workSchema = new Schema(
    {
        title: String,
        tasks: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Task'
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

export default model('Work', workSchema)