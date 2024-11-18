import { useEffect, useState } from "react"
import useObserver from "./useObserver"

export default function useGetMangas({ elementObserver }) {
    const [mangas, setMangas] = useState([])
    const [showLoading, setShowLoading] = useState(false);
    const [page, setPage] = useState(1)

    const { intersects } = useObserver({ elementRef: elementObserver })

    useEffect(() => {
        if (!intersects) return;
        if (intersects) {
            setPage((prev) => prev + 1)
        }
    }, [intersects])

    useEffect(() => {
        setShowLoading(true)
        // fetch("https://api.jikan.moe/v4/manga/top/all/1/1")
        fetch(`https://api.jikan.moe/v4/manga?page=${page}&limit=15`).then((response) => {
            return response.json()
        }).then((data) => {

            setShowLoading(false)
            setMangas((prev) => prev.concat(data.data))
        })

        // console.log("PAGE", page)

    }, [page])

    // useEffect(() => {
    //     console.log("MANGAS", mangas)
    // }, [mangas])

    return ({ page, setPage, mangas, setMangas, showLoading })
}
