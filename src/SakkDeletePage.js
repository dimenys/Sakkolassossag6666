import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export function SakkDeletePage() {
    const navigate = useNavigate();
    const id = useParams().sakkId;
    const [sakk, setSakk] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3001/chess/${id}`);
                setSakk(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setPending(false);
            }
        })();
    }, [id]);
 
    return (
        <div className='p-5 m-auto text-center content bg-lavender'>
            {isPending || !sakk.id ? (<div className='spinner-border'></div>) : (
                <div>
                    <h2>Sakk törlése</h2>
                    <div className='card p-3'>
                        <div className='card-body'>
                            <h4>{sakk.nev}</h4>
                            <h5 className='card-title'>{sakk.kiadasEve}</h5>
                            <h5>{sakk.ertekeles}</h5>
                            <img src={sakk.kepneve} alt={sakk.nev}></img>
                        </div>
                        <form onSubmit={async (e) => {
                            try {
                                e.preventDefault();
                                await axios.delete(`http://localhost:3001/chess/${id}`);
                                navigate("/");
                            } catch (error) {
                                console.log(error);
                            };
                        }}>
                            <div>
                                <NavLink to={"/"}>
                                    <button className="bi bi-backspace btn btn-warning rounded">Mégsem</button>
                                </NavLink>
                                <button className="bi bi-trash3 btn btn-danger rounded">Törlés</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
