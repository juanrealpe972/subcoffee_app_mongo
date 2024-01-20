import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin, errors: signinErrors } = useAuth();

    const onSubmit = handleSubmit(async (data) => {
        signin(data);
    })

    return (
        <div className='flex h-[calc(100vh-100px)] justify-center items-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white my-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <h1 className='text-2xl font-bold'>Login</h1>
                <form onSubmit={onSubmit}>
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
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage