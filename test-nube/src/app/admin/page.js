"use client";
import Galery from "@/components/Galery";
import ModalAdmin from "@/components/ModalAdmin";
import { ContextSessionProvider } from "@/services/functions/ContextSession";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function Admin() {

    const { session } = useContext(ContextSessionProvider)

    const router = useRouter()

    useEffect(() => {
        if (!session) {
            router.push("/login")
        }
    }, [])

    return (
        <>
            <Galery Modal={ModalAdmin} />

        </>
    )
}
