import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RiEyeLine, RiEyeOffLine, RiLockLine, RiMailLine } from "react-icons/ri";

function LoginPage() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signin, errors: signinErrors, isAuthenticated } = useAuth();
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = handleSubmit((data) => {
        signin(data);
    })

    useEffect(() => {
        if (isAuthenticated) navigate("/tasks")
    }, [isAuthenticated])

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="bg-white p-8 rounded-lg w-full md:w-[400px] shadow-xl">
                <div className="mb-5">
                    <h1 className="text-3xl uppercase font-bold text-center text-black">
                        Iniciar sesión
                    </h1>
                </div>
                {
                    signinErrors.map((error, i) => (
                        <div className='bg-red-500 p-2 text-white text-center my-2' key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit} className='flex flex-col gap-4 mb-6'>
                    <div className="relative">
                        <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            {...register('email', { required: true })}
                            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg text-black"
                            placeholder='Email address'
                        />
                        {errors.email && (
                            <p className='text-red-500'>Email address is required</p>
                        )}
                    </div>
                    <div className="relative">
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
                    <p className="text-right">
                        <Link to="recuperar" className="text-gray-500 hover:text-sky-600 hover:underline transition-colors">
                            ¿Olvidaste tu password?
                        </Link>
                    </p>
                    <div>
                        <button className="mt-1 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all">
                            Ingresar
                        </button>
                    </div>
                    <p className='flex gap-x-2 justify-between text-black'>
                        ¿No tienes una cuenta?<Link to="/register" className='text-sky-500 hover:text-blue-800 transition-colors'>Registrarse</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default LoginPage