import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema(
    {
        name: {
            type: String
        },
        lastname: {
            type: String,
        },
        empresa: {
            type: String
        },
        valid: {
            type: Boolean,
            default: false
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        roles: [
            {
                ref: 'Role',
                type: Schema.Types.ObjectId
            }
        ]
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

userSchema.statics.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

export default model('User', userSchema)
