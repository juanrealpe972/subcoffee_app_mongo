import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine, RiUser2Line } from "react-icons/ri";

function RegisterPage() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signup, isAuthenticated, errors: registerError } = useAuth()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        if (isAuthenticated) navigate("/login")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async (values) => {
        signup(values)
    })

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="bg-white p-8 rounded-lg w-full md:w-[500px] shadow-xl">
                <div className="mb-6">
                    <h1 className="text-3xl uppercase font-bold text-center text-black">
                        Registrarse
                    </h1>
                </div>
                {
                    registerError.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white' key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit} className='flex flex-col gap-4 mb-6'>
                    <div className='relative'>
                        <RiUser2Line className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            {...register('username', { required: true })}
                            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg text-black"
                            placeholder='Username'
                        />
                        {errors.username && (
                            <p className='text-red-500'>Username is required</p>
                        )}
                    </div>
                    <div className="relative">
                        <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg text-black"
                            placeholder="Correo electrónico"
                        />
                    </div>
                    {errors.email && (
                        <p className='text-red-500'>Email address is required</p>
                    )}
                    <div className='relative'>
                        <RiLockLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type={showPassword ? "text" : "password"}
                            {...register('password', { required: true })}
                            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg text-black"
                            placeholder='Password'
                        />
                        {showPassword ? (
                            <RiEyeOffLine
                                onClick={handleShowPassword}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                            />
                        ) : (
                            <RiEyeLine
                                onClick={handleShowPassword}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:cursor-pointer"
                            />
                        )}
                        {errors.password && (
                            <p className='text-red-500'>Password is required</p>
                        )}
                    </div>
                    <button type='submit' className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Registrarse
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between text-black'>
                    ¿Ya tienes una cuenta?<Link to="/login" className='text-sky-500 hover:text-blue-800  transition-colors'>Iniciar sesión</Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage