
import useAutoLogin from "@/services/hooks/useAutoLogin"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {

    const path = usePathname()

    const { loadingSession, session } = useAutoLogin()

    // alert(path)
    return (
        <header >
            <nav className="h-[8vh] bg-zinc-900 px-6  flex items-center justify-between">
                <Link href={"/"}>
                    <h1>Test <span className="text-sky-600">Nube</span></h1>
                </Link>
                <span className="justify-self-center">
                    {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
                </span>

                {/* To do: Simplificar */}
                {!loadingSession && session && path === "/admin" && <Link href={"/"}>Go to Home</Link>}
                {!loadingSession && session && path === "/" && <Link href={"/admin"}>Go to Admin</Link>}
                {!loadingSession && !session && path === "/" && <Link href={"/login"}>Login</Link>}
                {path === "/login" && <Link href={"/"}>Go to Home</Link>}
                {loadingSession && path !== "/login" &&
                    <svg className="animate-spin" width="32px" height="32px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ><g><circle strokeDasharray="164.93361431346415 56.97787143782138" r="35" strokeWidth="10" stroke="#ffffff" fill="none" cy="50" cx="50" transform="matrix(1,0,0,1,0,0)" />
                        <g /></g>
                    </svg>
                }

            </nav>
        </header>
    )
}
