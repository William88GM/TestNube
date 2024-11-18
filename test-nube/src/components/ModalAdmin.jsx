import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ModalAdmin({ modalData, setModalData, mangas, setMangas }) {

    //Formulario controlado
    const [formValues, setFormValues] = useState({
        image: modalData?.images?.webp?.image_url || `${process.env.NEXT_PUBLIC_PAGE_URL}/placeholder.webp`,
        title: modalData?.title || "",
        synopsis: modalData?.synopsis || "",
        mangaId: modalData?.mal_id || ""

    })

    useEffect(() => {
        setFormValues(
            {
                image: modalData?.images?.webp?.image_url || `${process.env.NEXT_PUBLIC_PAGE_URL}/placeholder.webp`,
                title: modalData?.title || "",
                synopsis: modalData?.synopsis || "",
                mangaId: modalData?.mal_id || ""
            }
        )
    }, [modalData])


    //Formulario controlado
    function handleChange(e) {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    //Cambiar imagen del formulario
    const handleFileChange = async (event, index) => {

        const file = event.target.files[0];

        const maxSize = 20 * 1024 * 1024; // Tamaño máximo en bytes (20 MB en este caso)

        if (file && file.size > maxSize) {
            alert('El archivo es demasiado grande. El tamaño máximo permitido es 20 MB.');
            event.target.value = '';
        } else {
            if (file) {
                try {

                    const webpImage = await convertImageToWebP(file, 500, 500);

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const newEdiciones = { ...formValues };
                        newEdiciones.image = reader.result;
                        setFormValues(newEdiciones);

                    };
                    reader.readAsDataURL(webpImage);
                } catch (error) {
                    console.error("Error al convertir la imagen a WebP:", error);
                }
            }
        }
    };

    //Transformar imagen a webp
    const convertImageToWebP = (file, targetWidth) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const targetHeight = Math.floor((targetWidth * 16) / 9); // Altura basada en 9:16

                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                    const ctx = canvas.getContext('2d');

                    // Proporciones
                    const targetAspectRatio = 9 / 16;
                    const imgAspectRatio = img.width / img.height;

                    let sx, sy, sWidth, sHeight;

                    if (imgAspectRatio > targetAspectRatio) {
                        // Imagen más ancha: recortar bordes horizontales
                        sHeight = img.height;
                        sWidth = sHeight * targetAspectRatio;
                        sx = (img.width - sWidth) / 2; // Centrar horizontalmente
                        sy = 0;
                    } else {
                        // Imagen más alta: recortar bordes superiores/inferiores
                        sWidth = img.width;
                        sHeight = sWidth / targetAspectRatio;
                        sx = 0;
                        sy = (img.height - sHeight) / 2; // Centrar verticalmente
                    }

                    // Dibujar la imagen recortada en el canvas
                    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, targetWidth, targetHeight);

                    // Convertir a WebP
                    canvas.toBlob((blob) => {
                        if (blob) {
                            resolve(new File([blob], `${file.name.split('.')[0]}.webp`, { type: 'image/webp' }));
                        } else {
                            reject(new Error('No se pudo convertir la imagen a WebP'));
                        }
                    }, 'image/webp');
                };
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    //Transformar la imagen nueva o existente a binario y agregarla al FormData junto con los demás datos
    async function createFormData(imageSrc, title, synopsis,) {

        const formValues = new FormData();

        // Agregar título y sinopsis al FormData
        if (title) formValues.append('title', title);
        if (synopsis) formValues.append('synopsis', synopsis);

        if (imageSrc.startsWith('data:image/')) {
            // Si es Base64, convertir a binario
            const byteString = atob(imageSrc.split(',')[1]);
            const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];

            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const file = new File([ab], 'image.webp', { type: mimeString });
            formValues.append('image', file);
        } else if (imageSrc.startsWith('http')) {
            // Si es una URL, descargar y convertir a binario
            async function urlToBinary(url) {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Error al descargar la imagen desde la URL');
                }

                const blob = await response.blob();
                const fileName = url.split('/').pop(); // Extraer el nombre del archivo desde la URL
                const mimeType = blob.type;

                // Crear un objeto File a partir del Blob
                const file = new File([blob], fileName || 'image-from-url', { type: mimeType });
                return file;
            }

            try {
                const file = await urlToBinary(imageSrc);
                formValues.append('image', file);
            } catch (error) {
                console.error('Error al procesar la imagen de la URL:', error);
                return;
            }
        } else {
            console.error('Formato de imagen no reconocido');
            return;
        }

        return formValues

    }

    //Fetch con el FormData para CREAR o MODIFICAR un manga
    function handleSubmit(e) {
        e.preventDefault();
        const toastId = toast('Sonner');
        const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

        //Si la modal tiene una mangaID, es que se está editando, sino, se está creando
        if (modalData.mal_id) {

            const formDataToSend = createFormData(formValues.image, formValues.title, formValues.synopsis);
            const mangasViejos = JSON.parse(JSON.stringify(mangas));

            setMangas((prev) => {
                const mangasActualizados = prev.map((manga) => {
                    if (manga.mal_id === formValues.mangaId) {
                        manga.title = formValues.title;
                        manga.synopsis = formValues.synopsis;
                        manga.images.webp.image_url = formValues.image;
                    }
                    return manga;
                });
                return mangasActualizados;
            })
            setModalData(null)
            toast.loading("Guardando...", { id: toastId })

            //To do: Eliminar este timeout
            setTimeout(() => {
                console.log("SetTimeOut haciendo tiempo para que se vean las notificaciones");
            }, 200)

            fetch(`${endPoint}/api/modifyManga/${formValues.mangaId}`, {
                method: 'PUT',
                body: formDataToSend,
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log('Imagen y datos enviados con éxito:', data);
                    if (res.status === 200) {
                        setModalData(null)
                        toast.success("Guardado con éxito", { id: toastId })
                    }
                })
                .catch((err) => {
                    toast.error("Error al guardar", { id: toastId })
                    setMangas(mangasViejos)
                    setModalData(null)
                    console.log('Error al enviar la imagen y datos:', err);
                });
        } else {

            const formDataToSend = createFormData(formValues.image, formValues.title, formValues.synopsis);
            const mangasViejos = JSON.parse(JSON.stringify(mangas));
            setModalData(null)
            console.log("creando... ", formDataToSend);
            toast.loading("Creando...", { id: toastId })

            setMangas((prev) => [{
                mal_id: crypto.randomUUID(),
                title: formValues.title,
                synopsis: formValues.synopsis,
                images: {
                    webp: {
                        image_url: formValues.image
                    }
                }
            }, ...prev])

            //To do: Eliminar este timeout
            setTimeout(() => {
                console.log("SetTimeOut haciendo tiempo para que se vean las notificaciones");
            }, 200)

            fetch(`${endPoint}/api/create`, {
                method: 'POST',
                body: formDataToSend,
            }).then((res) => res.json())
                .then((res) => {
                    console.log('Imagen y datos enviados con éxito:', data);
                    if (res.status === 200) {
                        setModalData(null)
                        toast.success("Creado con éxito", { id: toastId })
                    }
                })
                .catch((err) => {
                    toast.error("Error al crear", { id: toastId })
                    setModalData(null)
                    setMangas(mangasViejos)
                    console.log('Error al enviar la imagen y datos:', err);
                });

        }

    }

    //Eliminar un manga
    function handleEliminate() {
        const toastId = toast('Sonner');
        const mangasViejos = JSON.parse(JSON.stringify(mangas));
        const endPoint = process.env.NEXT_PUBLIC_API_ENDPOINT

        toast.loading("Eliminando manga", { id: toastId })
        setMangas(
            (prev) => prev.filter(manga => manga.mal_id !== formValues.mangaId)
        )
        setModalData(null)

        //To do: Eliminar este timeout
        setTimeout(() => {
            console.log("SetTimeOut haciendo tiempo para que se vean las notificaciones");
        }, 200)

        fetch(`${endPoint}/api/deleteManga/${formValues.mangaId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(res => {
                console.log("RES: ", res)
                if (res.status === 200) {
                    toast.success("Manga eliminado", { id: toastId });
                    console.log(res)
                    setModalData(null)

                }
            }).catch(err => {
                toast.error("Error al eliminar el manga", { id: toastId })
                console.log('Error al eliminar el manga:', err);
                setMangas(mangasViejos)
                setModalData(null)
            })
    }





    return (<>
        {modalData && <>
            <form onSubmit={handleSubmit} className="absolute gap-3 p-6 z-20 w-[70vh] max-w-[100vw] h-[84vh] top-[9vh] left-[50%] translate-x-[-50%] border-2 border-neutral-800 bg-black flex flex-col items-center justify-start rounded-md">
                {formValues.mangaId && <button onClick={handleEliminate} className="absolute top-0 left-0 p-4">
                    <svg viewBox="0 0 24 24" width={"24px"} height={"24px"} fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g>
                    </svg>
                </button>}
                <button onClick={() => setModalData(null)} className="absolute top-0 right-0 pr-4 p-2 text-white text-3xl bg-black rounded-md">×</button>

                <img onClick={() => document.getElementById(`file-input`).click()} className="cursor-pointer w-[18vh] rounded-md " style={{ aspectRatio: "9/16" }} src={formValues.image || `${process.env.NEXT_PUBLIC_PAGE_URL}/placeholder.webp`} alt={modalData.title} />
                <input accept="image/*" type="file" id={`file-input`} style={{ display: 'none' }} onChange={(event) => handleFileChange(event)} />
                <input onChange={handleChange} type="text" className="w-100 text-center text-pretty " style={{ width: "100%" }} value={formValues.title} name="title" />
                <textarea onChange={handleChange} style={{ color: "#ffffff", backgroundColor: "#171717", width: "100%", height: "100%", outline: "none" }} className="w-100 text-center pr-3 text-pretty overflow-auto" value={formValues.synopsis} name="synopsis"></textarea>

                <div style={{ width: "100%" }} className="flex justify-between">
                    <button onClick={() => setModalData(null)} className=" p-2 text-white bg-black rounded-md">Cancel</button>
                    <button type="submit">Save</button>
                </div>
            </form>
            <div onClick={() => setModalData(null)} className="absolute h-[86vh] z-10 w-[100vw] top-[8vh] left-0 bg-black opacity-70"></div>
        </>}
        {!modalData && <button onClick={() => setModalData({ title: "", synopsis: "", image: `${process.env.NEXT_PUBLIC_PAGE_URL}/vercel.svg` })} className="absolute bottom-10 right-8 z-10 px-4 py-2 font-bold border-2 border-neutral-50 text-white bg-black rounded-xl" style={{ boxShadow: "0 0 10px 4px rgba(0,0,0,0.5)" }}>+</button>}
    </>
    )
}
