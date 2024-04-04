import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function SakkModPage() {

    const param = useParams();
    const navigate = useNavigate();
    const id = param.sakkId;
    const [, setSakk] = useState([]);
    const [modname, setModname] = useState("");
    const [modbirth_date, setModbirth_date] = useState("");
    const [modworld_ch_won, setModworld_ch_won] = useState("");
    const [modimage_url, setModimage_url] = useState("");

    useEffect(() => {

        (async () => {
            try {
                const response = await axios.get(`http://localhost:3001/chess/${id}`);
                const sakkData = response.data;
                console.log(response);
                setSakk(sakkData);
                setModname(sakkData.name);
                setModbirth_date(sakkData.birth_date);
                setModworld_ch_won(sakkData.world_ch_won);
                setModimage_url(sakkData.image_url);
            } catch (error) {
                console.log(error);   
            } 
        })();
    }, [id]);

    const modName = (e) => {
        setModname(e.target.value);
    }
    const modBirthDate = (e) => {
        setModbirth_date(e.target.value);
    }
    const modWorldChWon = (e) => {
        setModworld_ch_won(e.target.value);
    }
    const modImageUrl = (e) => {
        setModimage_url(e.target.value);
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const sakk = {
            id: id,
            name: e.target.elements.name.value,
            birth_date: e.target.elements.birth_date.value,
            world_ch_won: e.target.elements.world_ch_won.value,
            image_url: e.target.elements.image_url.value,
        };
        console.log(sakk);
        try {
            await axios.put(`http://localhost:3001/chess/${id}`, sakk, {
                headers: { "Content-Type": "application/json" }
            });
            console.log(sakk);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='p-5 content bg-lavender text-center'>
            <h2>Sakk módosítás</h2>
            <form onSubmit={handleFormSubmit}>
                <div className='form-group row pb-3'>
                    <label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
                    <div>
                        <input type="text" id="name" name="name" className="form-control" autoComplete='name' value={modname} onChange={modName} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="birth_date" className='col-sm-3 col-form-label'> Születési dátum: </label>
                    <div>
                        <input type="date" id="birth_date" name="birth_date" className="form-control" autoComplete='birth_date' value={modbirth_date} onChange={modBirthDate} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="world_ch_won" className='col-sm-3 col-form-label'> Világbajnoki címek: </label>
                    <div>
                        <input type="number" id="world_ch_won" name="world_ch_won" className="form-control" autoComplete='world_ch_won' value={modworld_ch_won} onChange={modWorldChWon} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="image_url" className='col-sm-3 col-form-label'> Kép URL: </label>
                    <div>
                        <input type="text" id="image_url" name="image_url" className="form-control" autoComplete='image_url' value={modimage_url} onChange={modImageUrl} />
                    </div>
                </div>
                <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}
