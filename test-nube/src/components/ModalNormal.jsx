
export default function ModalNormal({ modalData, setModalData }) {
    return (modalData && <>
        <div className="absolute gap-3 p-6 z-20 w-[70dvh] max-w-[100dvw] h-[84dvh] top-[9dvh] left-[50%] translate-x-[-50%] border-2 border-neutral-800 bg-black flex flex-col items-center justify-start rounded-md">
            <button onClick={() => setModalData(null)} className="absolute top-0 right-0 pr-4 p-2 text-white text-3xl bg-black rounded-md">×</button>
            <img className="w-[22vh] rounded-md " style={{ aspectRatio: "9/16" }} src={modalData.images.webp.image_url} alt={modalData.title} />
            <h4>{modalData.title}</h4>
            <p className="w-100 text-center pr-3 text-pretty  overflow-auto">{modalData.synopsis}</p>
        </div>
        <div onClick={() => setModalData(null)} className="absolute h-[86dvh] z-10 w-[100dvw] top-[8dvh] left-0 bg-black opacity-70"></div>
    </>
    )
}
