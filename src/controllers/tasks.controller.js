import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate('user')
        res.json(tasks)
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong" })
    }
}

export const createTasks = async (req, res) => {
    try {
        const { title, description, dateTime, date } = req.body

        const newTasks = new Task({
            title,
            description,
            dateTime,
            date,
            user: req.user.id
        })
        const savedTask = await newTasks.save();
        res.json(savedTask)
    } catch (error) {
        return res.status(404).json({ message: "Something went wrong" })
    }
}

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user');
        if (!task) return res.status(404).json({ message: "Task not found" })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ message: "Task not found" })
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        if (!task) return res.status(404).json({ message: "Task not fund" })
        res.json(task)
    } catch (error) {
        return res.status(404).json({ messaje: "The task was not updated" })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).json({ message: "Task not fund" })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "The task was not deleted" })
    }
}