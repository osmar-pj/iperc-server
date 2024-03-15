import Task from '../models/Task'
import Iperc from '../models/Iperc'
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export const createIperc = async (req, res) => {
    try {
        const { task } = req.body
        const taskHelp = "Cableado electrico."
        const ipercMessages = [
            { role: "user", content: `{"iperc": [
                {
                    "danger": "Peligro 1",
                    "risk": "Riesgo 1",
                    "control": "Control 1"
                },
                {
                    "danger": "Peligro 2",
                    "risk": "Riesgo 2",
                    "control": "Control 2"
                },
                {
                    "danger": "Peligro 3",
                    "risk": "Riesgo 3",
                    "control": "Control 3"
                },
                {
                    "danger": "Peligro 4",
                    "risk": "Riesgo 4",
                    "control": "Control 4"
                },
                {
                    "danger": "Peligro 5",
                    "risk": "Riesgo 5",
                    "control": "Control 5"
                }
            ]}` },
            { role: "system", content: "The code you provided is a JavaScript object named iperc that has three properties: hazard, risk, and control. Each property contains an array of objects, where each object has a single property called description with a string value." },
            { role: "user", content: `ejemplo iperc actualizado considerando una tarea de ${taskHelp}` },
            { role: "system", content: `{"iperc": [
                        {
                            "danger": "Contacto con cables eléctricos",
                            "risk": "Posibilidad de electrocución",
                            "control": "Usar equipo de protección personal (EPP), cortar la energía antes de trabajar, verificar cables antes de tocarlos"
                        },
                        {
                            "danger": "Exposición a corrientes eléctricas",
                            "risk": "Quemaduras eléctricas",
                            "control": "Utilizar herramientas y equipos aislados, seguir las normas de seguridad eléctrica, evitar contacto directo con conductores"
                        },
                        {
                            "danger": "Falta de capacitación en cableado eléctrico",
                            "risk": "Errores y accidentes",
                            "control": "Recibir formación en seguridad eléctrica, seguir procedimientos adecuados de cableado, consultar a un experto cuando sea necesario"
                        },
                        {
                            "danger": "Mal reciclaje de residuos",
                            "risk": "Afectación al medio ambiente",
                            "control": "Separar residuos, reciclar materiales, desechar residuos peligrosos en lugares adecuados"
                        }
                    ]
                }}`
            }
        ]

        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                ...ipercMessages,
                { role: "user", content: `actualiza iperc considerando la tarea de ${task.description}` },
            ]
        })
        const result = chatCompletion.choices[0].message.content
        const data = JSON.parse(result)
        data.iperc.forEach(async(i) => {
            const newIperc = await Iperc.create({
                danger: i.danger,
                risk: i.risk,
                control: i.control,
                point: 19,
                task: task._id,
                user: req.userId
            })
            const updateTask = await Task.findById(task._id)
            updateTask.iperc.push(newIperc._id)
            await updateTask.save()
        })
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getIpercs = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId})
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getIpercById = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id).populate('iperc')
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateIpercById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, published } = req.body
        const updatedTask = await Task.findByIdAndUpdate(id, {
            title,
            description,
            published
        }, { new: true })
        res.status(200).json(updatedTask)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteIpercById = async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id)
        res.status(200).json({ message: `Task ${id} deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}