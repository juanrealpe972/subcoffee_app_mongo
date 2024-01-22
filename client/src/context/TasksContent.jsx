import { createContext, useContext, useEffect, useState } from "react";
import {
    createTasksRequest,
    getTasksRequest,
    deleteTasksRequest,
    getTaskRequest,
    updateTasksRequest
} from "../api/tasks";

const TaskContext = createContext()

export const useTasks = () => {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error('useTasks must be used within the TaskProvider')
    }
    return context;
}

export function TaskProvider({ children }) {

    const [errors, setErrors] = useState([])
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    const createTask = async (task) => {
        try {
            const res = await createTasksRequest(task)
            console.log(res);
        } catch (error) {
            setErrors([error.response.data.message]);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTasksRequest(id)
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTasksRequest(id, task)
        } catch (error) {
            setErrors(error.response.data)
        }
    }

    useEffect(()=>{
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [errors])

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask,
                getTasks,
                deleteTask,
                getTask,
                updateTask,
                errors,
            }}>
            {children}
        </TaskContext.Provider>
    )
}