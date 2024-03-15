import User from '../models/User.js'
import Role from '../models/Role.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    try {
        const { name, lastname, email, password, roles } = req.body

        const newUser = new User({
            name,
            lastname,
            email,
            password: await User.encryptPassword(password)
        })

        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } })
            newUser.roles = foundRoles.map(role => role._id)
        } else {
            const role = await Role.findOne({ name: 'user' })
            newUser.roles = [role._id]
        }

        // const savedUser = await newUser.save()

        // const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
        //     expiresIn: 86400*30*12 // 24 horas por 30 dias por 12 meses
        // })

        res.status(200).json({ message: 'Usuario creado correctamente', status: true })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const signin = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email }).populate(
            'roles'
        )
        if (!userFound) return res.status(400).json({ message: 'No existe el usuario', status: false })

        const matchPassword = await User.comparePassword(
            req.body.password,
            userFound.password
        )

        // // user is not valid
        // if (!userFound.valid) {
        //     return res.status(401).json({ token: null, message: 'Usuario sin permiso de ingreso', status: false })
        // }
        
        if (!matchPassword)
            return res.status(401).json({ token: null, message: 'Invalid account or password', status: false })

        const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
            expiresIn: 86400*30*12 // 12 meses
        })
        res.json({
            user: userFound.name,
            userId: userFound._id.toString(),
            empresa: userFound.empresa,
            token,
            area: userFound.area,
            status: true,
            roles: userFound.roles,
            message: 'Bienvenido'
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}