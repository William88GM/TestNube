
import useAutoLogin from "@/services/hooks/useAutoLogin"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {

    const path = usePathname()

    const { loadingSession, session } = useAutoLogin()

    // alert(path)
    return (
        <header >
            <nav className="h-[8dvh] bg-zinc-900 px-6  flex items-center justify-between">
                <Link href={"/"}>
                    <h1>Test <span className="text-sky-600">Nube</span></h1>
                </Link>
                <span className="justify-self-center border-b-2">
                    {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                </span>

                {/* To do: Simplificar */}
                {!loadingSession && session && path === "/admin" && <Link href={"/"} className="flex items-center gap-2">Go to Home
                    <svg width={"16px"} height={"16px"} viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g xmlns="http://www.w3.org/2000/svg" id="SVGRepo_iconCarrier"> <path d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z" fill="#fff" /> </g>
                    </svg>
                </Link>}

                {!loadingSession && session && path === "/" && <Link href={"/admin"} className="flex items-center gap-2">Go to Admin
                    <svg width={"16px"} height={"16px"} viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g xmlns="http://www.w3.org/2000/svg" id="SVGRepo_iconCarrier"> <path d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z" fill="#fff" /> </g>
                    </svg></Link>}

                {!loadingSession && !session && path === "/" && <Link href={"/login"} className="flex items-center gap-2">
                    Login <svg width={"18px"} height={"18px"} fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M22,20a1,1,0,0,1-2,0V4a1,1,0,0,1,2,0ZM3,13H14.586l-2.293,2.293a1,1,0,1,0,1.414,1.414l4-4a1,1,0,0,0,0-1.414l-4-4a1,1,0,1,0-1.414,1.414L14.586,11H3a1,1,0,0,0,0,2Z"></path></g>
                    </svg>
                </Link>}

                {path === "/login" && <Link href={"/"} className="flex items-center gap-2">
                    Go to Home
                    <svg width={"16px"} height={"16px"} viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                        <g xmlns="http://www.w3.org/2000/svg" id="SVGRepo_iconCarrier"> <path d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z" fill="#fff" /> </g>
                    </svg></Link>}

                {loadingSession && path !== "/login" &&
                    <svg className="animate-spin" width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" stroke="#ffffff" fill="none" cy="50" cx="50" transform="matrix(1,0,0,1,0,0)" />
                        <g /></g>
                    </svg>
                }

            </nav>
        </header>
    )
}
