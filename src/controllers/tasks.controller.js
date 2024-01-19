import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks)
}

export const createTasks = async (req, res) => {
    const { title, description, date } = req.body

    console.log(req.user);

    const newTasks = new Task({
        title,
        description,
        date, 
        user: req.user.id
    })
    const savedTask = await newTasks.save();
    res.json(savedTask)
}

export const getTask = async (req, res) => {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json(task)
}

export const updateTask = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    if (!task) return res.status(404).json({ message: "Task not fund" })
    res.json(task)
}

export const deleteTask = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not fund" })
    return res.sendStatus(204)
}