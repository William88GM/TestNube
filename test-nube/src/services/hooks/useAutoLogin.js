import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { ContextSessionProvider } from "../functions/ContextSession"

export default function useAutoLogin() {

    const [loadingSession, setLoadingSession] = useState(false)
    const router = useRouter()
    const { session, setSession } = useContext(ContextSessionProvider)
    useEffect(() => {
        if (session) return
        setLoadingSession(true)
        fetch(`${process.env.NEXT_PUBLIC_APIENDPOINT}/api/autologin`)
            .then(res => res.json())
            .then(res => {
                console.log("RES: ", res)
                if (res.status === 200) {
                    console.log("Autologin")
                    setSession(true)
                    setLoadingSession(false)
                    router.push("/admin")
                }
            }).catch(err => {
                console.log("Error al auto-login")
                setLoadingSession(false)
            })
    }, [])
    return { loadingSession, session }
}
