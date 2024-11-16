import { poppins } from "@/app/fonts/fonts";

export default function Card({ image, title, description }) {


    return (
        <div className={`card ${poppins.className} bg-zinc-900 bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${image || ""})` }}>
            {/* <img className="w-100 h100" src={image} alt="card" /> */}
            <h5 className=" bg-zinc-800 ">{title}</h5>
            <div className="card-details">
                <h6>{title}</h6>
                <p>{description}</p>
            </div>
        </div>
    )
}
