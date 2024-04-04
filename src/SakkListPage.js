import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';


export function SakkListPage() {

    const [sakk, setSakk] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get("http://localhost:3001/chess")
            .then((response) => {
                setSakk(response.data);
            }) 
            .catch((error) => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    return (
        <div className='p-5 m-auto text-center content bg-ivory'>
            {isFetchPending ? (<div className='spinner-border'></div>) : (
                <div>
                    <h2>Sakkok</h2>
                    <div className="d-flex flex-wrap justify-content-center">
                        {sakk.map((sakk) => (
                            <div key={sakk.id + 4} className='card m-1 p-2' style={{ width: "200px" }}>
                                <h6 className='text-muted'>Név: {sakk.name}</h6>
                                <h5 className='text-muted'>Születési év: {sakk.birth_date}</h5>
                                <p>Címek száma: {sakk.world_ch_won}</p>
                                <NavLink key={sakk.id} to={"/sakk/" + sakk.id}>
                                    <div className='card-body'>
                                        <img src={sakk.image_url} style={{ width: "100%", height: "auto" }} alt="Kép" />
                                    </div>
                                </NavLink>
                                <br />
                                <NavLink key={sakk.id + 1} to={"/mod-sakk/" + sakk.id}>
                                    <i className="bi bi-pencil-square mx-1">Módosítás</i>
                                </NavLink>
                                <NavLink key={sakk.id + 2} to={"/del-sakkok/" + sakk.id} className={"text-danger"}>
                                    <i className="bi bi-trash3">Törlés</i>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
