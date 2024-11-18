import { useRef, useState } from "react";
import Card from "./Card"
import useGetMangas from "@/services/hooks/useGetMangas";

export default function Galery({ Modal }) {

    const [modalData, setModalData] = useState(null)
    const elementObserver = useRef(null);
    const { mangas, setMangas, page, showLoading } = useGetMangas({ elementObserver })

    function handleModal(manga) {
        setModalData(manga)
    }

    return (
        <>
            <Modal modalData={modalData} setModalData={setModalData} mangas={mangas} setMangas={setMangas} />
            <div className="galery">
                {mangas && mangas[0] && mangas.map((manga) => {
                    return (
                        <div onClick={() => handleModal(manga)} key={manga.title}>
                            <Card image={manga.images.webp.image_url} title={manga.title} description={manga.synopsis} />
                        </div>
                    )
                })}
                <div ref={elementObserver}></div>
            </div >
            {showLoading ? <p className="text-center">Loading...</p> : ""}
        </>
    )
}
