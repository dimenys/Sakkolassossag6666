import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";
import axios from 'axios';

export function SakkSinglePage() {

    const param = useParams();
    const id = param.sakkId;
    const [sakk, setSakk] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async() => {
            try {
                const response = await axios.get(`http://localhost:3001/chess/${id}`);
                setSakk(response.data);
            } catch(error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);

    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            { isPending || !sakk.id ? (
                <div className='spinner-border'></div>
            ) : (       
                <div className='card p-3'>
                    <div className='card-body'>
                        <h4 a href={sakk.profile_url} target="_blank" rel="noopener noreferrer">Sakk: {sakk.name} </h4>
                        <h5 className='card-title'>Születési éve: {sakk.birth_date}</h5>
                        <h5>Címek: {sakk.world_ch_won}</h5>
                        
                        <NavLink to={"/"}>
                            <img src={sakk.image_url}></img>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    ); 
}
