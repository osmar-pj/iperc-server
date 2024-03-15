import Work from '../models/Work'
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export const createWork = async (req, res) => {
    try {
        const { title } = req.body
        const newWork = await Work.create({
            title,
            user: req.userId
        })
        
        const work = "cambio de un motor ventilador de una bomba hidraulica"
        const workMessages = [
            { role: "user", content: `{
                "task": [
                        { "description": "task 1" },
                        { "description": "task 2" },
                        { "description": "task 3" }
                    ]
                }`
            },
            { role: "system", content: "The work object contains a property named tasks, which is an array of objects. Each object in the array represents a task and has a description property containing a string" },
            { role: "user", content: `ejemplo work actualizado considerando un trabajo de ${work}` },
            { role: "system", content: `{
                    "task": [
                        { "description": "Preparar herramientas y equipos necesarios." },
                        { "description": "Apagar y desconectar la bomba hidráulica." },
                        { "description": "Asegurarse de que la bomba esté despresurizada." },
                        { "description": "Desmontar la carcasa de protección del motor ventilador." },
                        { "description": "Desconectar los cables y conexiones del motor antiguo." },
                        { "description": "Retirar el motor ventilador antiguo." },
                        { "description": "Instalar el nuevo motor ventilador en su lugar." },
                        { "description": "Conectar los cables y conexiones al nuevo motor." },
                        { "description": "Volver a montar la carcasa de protección del motor." },
                        { "description": "Realizar pruebas para asegurarse de que el motor funciona correctamente." },
                        { "description": "Volver a conectar la bomba hidráulica." },
                        { "description": "Realizar inspección final y limpieza del área de trabajo." }
                    ]
                }`
            }
        ]

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                ...workMessages,
                { role: "user", content: `actualiza work considerando un trabajo de ${title}` },
            ]
        })
        
        const result = chatCompletion.choices[0].message.content
        const tasks = JSON.parse(result)
        res.status(200).json({tasks, newWork})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getWorks = async (req, res) => {
    try {
        const works = await Work.find({ user: req.userId }).populate({'path': 'tasks', 'populate': { 'path': 'iperc' }})
        res.status(200).json({works})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getWorkById = async (req, res) => {
    try {
        const { id } = req.params
        const work = await Work.findById(id).populate({'path': 'tasks', 'populate': { 'path': 'iperc' }})
        res.status(200).json({work})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateWorkById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, published } = req.body
        const updatedWork = await Work.findByIdAndUpdate(id, {
            title,
            description,
            published
        }, { new: true })
        res.status(200).json({updatedWork})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteWorkById = async (req, res) => {
    try {
        const { id } = req.params
        await Work.findByIdAndDelete(id)
        res.status(200).json({ message: 'Work was deleted successfully!' })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}