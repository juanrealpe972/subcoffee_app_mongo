import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiMailLine } from "react-icons/ri";

function ForgetPassword() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='flex h-screen justify-center items-center'>
            <div className='bg-white p-8 rounded-lg w-full md:w-[500px] shadow-xl'>
                <div className='mb-10'>
                    <h1 className="text-3xl uppercase font-bold text-center">
                        Recuperar contraseña
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4 mb-6'>
                    <div className="relative">
                        <RiMailLine className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="email"
                            className="w-full border border-gray-200 outline-none py-2 px-8 rounded-lg"
                            placeholder="Correo electrónico"
                        />
                    </div>
                    <div>
                        <button className="mt-6 bg-sky-600 text-white w-full py-2 px-6 rounded-lg hover:scale-105 transition-all">
                            Recuperar contraseña
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-between">
                    <div>
                        ¿Ya tienes una cuenta?{" "}
                        <Link to="/login" className="text-sky-600 font-medium hover:underline transition-all">
                            Ingresa
                        </Link>
                    </div>
                    <div className="text-right">
                        ¿No tienes una cuenta?{" "}
                        <Link to="/register" className="text-sky-600 font-medium hover:underline transition-all">
                            Registrate
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword