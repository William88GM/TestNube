"use client"
import { ContextSessionProvider } from "@/services/functions/ContextSession"
import { useRouter } from "next/navigation"
import { useContext, useState } from "react"

export default function Login() {

    const { session, setSession } = useContext(ContextSessionProvider)
    const router = useRouter()

    const [error, setError] = useState("")
    const [formValues, setFormValues] = useState({
        user: "",
        password: ""
    })




    function handleChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        // fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/login`, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formValues),
        // })
        //     .then((response) => response.json())
        //     .then((res) => {
        //         if (res.status === 200) {
        //             setError("")
        //             //Cambiar el estado global de login
        //             //redireccionar al home
        //         } else {
        //             setError("Usuario o password incorrecto")
        //         }
        //     }).catch((err) => {
        //         console.log(err)
        //     })



        //Ejemplo de login correcto


        const usuarioCorrectoEjemplo = "admin"
        const passwordCorrectoEjemplo = "admin*1234"
        if (formValues.user == usuarioCorrectoEjemplo && formValues.password == passwordCorrectoEjemplo) {
            setSession(true)
            setError("")
            router.push("/admin")
        } else {
            setError("Usuario o password incorrecto")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="border-2 rounded-2xl border-neutral-500 flex gap-6 w-[80vw] max-w-lg m-auto p-12 mt-[8vh] flex-col items-center justify-center">
                <label className="flex flex-col">
                    <span>Usuario</span>
                    <input className="input-login" placeholder="admin" onChange={handleChange} value={formValues.user} type="text" name="user" />
                </label>
                <label className="flex flex-col">
                    <span>Password</span>
                    <input className="input-login" placeholder="admin*1234" onChange={handleChange} value={formValues.password} type="password" name="password" />
                </label>
                <button className="button-login bg-blue-600 p-2 rounded-md text-white" type="submit">Login</button>
            </form>
            {error ? <p>{error}</p> : ""}
        </>
    )
}
