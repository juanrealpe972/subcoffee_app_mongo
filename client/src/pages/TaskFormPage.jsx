import { useForm } from 'react-hook-form'
import { useTasks } from '../context/TasksContent';
import { useNavigate } from "react-router-dom";

function TaskFormPage() {
    const { register, handleSubmit } = useForm()

    const { createTask } = useTasks()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        createTask(data);
        navigate("/tasks")
    })


    return (
        <div className='flex flex-col'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("title")}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-3'
                        autoFocus
                    />
                    <textarea
                        rows="3"
                        placeholder="Description"
                        {...register('description')}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    >
                    </textarea>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save</button>
                </form>
            </div>
        </div>
    )
}

export default TaskFormPage