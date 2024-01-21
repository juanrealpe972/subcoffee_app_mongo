import { useTasks } from "../context/TasksContent";
import { Link } from "react-router-dom";

function TaskCard({ task }) {

    const { deleteTask } = useTasks()

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <h1 className="text-slate-100 text-2xl font-bold">{task.title}</h1>
            <p className="text-slate-300">{task._id}</p>
            <p className="text-slate-300">{task.description}</p>
            <footer className="flex justify-between">
                <p>{new Date(task.date).toLocaleDateString()}</p>
                <div className="flex gap-x-3 items-center">
                    <button
                        onClick={() => {
                            deleteTask(task._id);
                        }}
                    >
                        delete
                    </button>
                    <Link to={`/tasks/${task._id}`}>edit</Link>
                </div>
            </footer>
        </div>
    )
}

export default TaskCard