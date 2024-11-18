"use client";
import Galery from "@/components/Galery";
import ModalNormal from "@/components/ModalNormal";
export default function Home() {

  const logged = false


  return (
    <>
      <Galery Modal={ModalNormal} />
    </>
  );
}
