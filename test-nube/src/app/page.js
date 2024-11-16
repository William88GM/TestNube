"use client";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
export default function Home() {

  const [mangas, setMangas] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    // fetch("https://api.jikan.moe/v4/manga/top/all/1/1")
    fetch(`https://api.jikan.moe/v4/manga?page=${page}&limit=25`).then((response) => {
      return response.json()
    }).then((data) => {
      setMangas(data.data)
    })


  }, [])

  useEffect(() => {
    console.log(mangas)
  }, [mangas])


  return (
    <>
      <div className="galery">
        {mangas.map((manga) => {
          return (
            <Card key={manga.mal_id} image={manga.images.webp.image_url} title={manga.title} description={manga.synopsis} />
          )
        })}
      </div>
    </>
  );
}
