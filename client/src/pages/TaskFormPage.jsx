import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContent';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from 'react';

// actualizar la fecha
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

function TaskFormPage() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    const { createTask, getTask, updateTask, errors: tastsError } = useTasks()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                //* Get the task by its id and set it to the form
                const task = await getTask(params.id)
                setValue('title', task.title)
                setValue('description', task.description)
                setValue('dateTime', dayjs(task.dateTime).utc().format('YYYY-MM-DDThh:mm'))
            }
        }
        loadTask()
    }, [])

    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, {
                ...data,
            });
        } else {
            createTask({
                ...data,
                dateTime: dayjs.utc(data.date).format(),
            });
        }
        navigate("/tasks")
    })

    return (
        <div className='flex flex-col'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <div className='mb-6'>
                    <h1 className='text-3xl uppercase font-bold text-center text-black'>
                        Agregar Tarea
                    </h1>
                </div>
                {
                    tastsError.map((error, i) => {
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    })
                }

                <form onSubmit={onSubmit}>
                    <label htmlFor="title">title</label>
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("title")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3'
                        autoFocus
                    />
                    {errors.title && (
                        <p className="text-red-500">This field is required.</p>
                    )}
                    <label htmlFor="description">description</label>
                    <textarea
                        rows="3"
                        placeholder="Description"
                        {...register('description')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                    </textarea>
                    {errors.description && (
                        <p className="text-red-500">This field is required.</p>
                    )
                    }
                    <label htmlFor="date">Date:</label>
                    <input
                        type="datetime-local"
                        {...register('dateTime')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    {errors.dateTime && (
                        <p className="text-red-500">Invalid date and time format!</p>
                    )}
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Guardar</button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage