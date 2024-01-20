import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: registerError } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='flex h-[calc(100vh-100px)] justify-center items-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    registerError.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl font-bold mb-5'>Register</h1>
                <form onSubmit={onSubmit}>

                    <input type="text" {...register('username', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='username'
                    />
                    {errors.username && (
                        <p className='text-red-500'>Username is required</p>
                    )}
                    <input type="email" {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Email address'
                    />
                    {errors.email && (
                        <p className='text-red-500'>Email address is required</p>
                    )}
                    <input type="password" {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Password'
                    />
                    {errors.password && (
                        <p className='text-red-500'>Password is required</p>
                    )}
                    <button type='submit' className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Register
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between'>
                        Already have an account?<Link to="/login" className='text-sky-500'>Login</Link>
                    </p>
            </div>
        </div>
    )
}

export default RegisterPage