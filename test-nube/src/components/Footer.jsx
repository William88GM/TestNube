import { ContextSessionProvider } from "@/services/functions/ContextSession"
import { useRouter } from "next/navigation"
import { useContext } from "react"

export default function Footer() {

    const { session, setSession } = useContext(ContextSessionProvider)
    const router = useRouter()

    function handleLogout() {
        // fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/logout`)
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.status === 200) {
        //             setSession(false)
        //             router.push("/")
        //         }
        //     }).catch(err => {
        //         console.log("Error al cerrar sesión", err)
        //     })

        setSession(false)
        router.push("/")

    }

    return (
        <footer className="h-[6vh] flex items-center justify-end gap-8 bg-zinc-900 px-6" >
            {session && <button className="flex gap-1 items-center" onClick={handleLogout}>
                <svg fill="#ffffff" width={"20px"} height={"20px"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M2.293,11.293l4-4A1,1,0,1,1,7.707,8.707L5.414,11H17a1,1,0,0,1,0,2H5.414l2.293,2.293a1,1,0,1,1-1.414,1.414l-4-4a1,1,0,0,1,0-1.414ZM20,4V20a1,1,0,0,0,2,0V4a1,1,0,0,0-2,0Z"></path></g>
                </svg>
                Logout
            </button>}
            <small> © 2024 TestNube</small>
        </footer>
    )
}
