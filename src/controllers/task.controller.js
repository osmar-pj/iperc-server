import Work from '../models/Work'
import Task from '../models/Task'
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY})

export const createTask = async (req, res) => {
    try {
        console.log(req.body)
        const { task, workId } = req.body
        const newTask = await Task.create({
            description: task.description,
            routine: 'Si',
            user: req.userId,
            work: workId
        })
        const work = await Work.findById(workId)
        work.tasks.push(newTask._id)
        await work.save()
        res.status(200).json({newTask})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.userId}).populate('work')
        res.status(200).json(tasks)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const getTaskById = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id).populate('iperc')
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.body)
        const { title, description, routine } = req.body
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

export const deleteTaskById = async (req, res) => {
    try {
        const { id } = req.params
        await Task.findByIdAndDelete(id)
        res.status(200).json({ message: `Task ${id} deleted successfully` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}