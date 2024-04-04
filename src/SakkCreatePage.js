import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function SakkCreatePage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        birth_date: '',
        world_ch_won: '',
        image_url: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/chess", {
                name: formData.name,
                birth_date: formData.birth_date,
                world_ch_won: formData.world_ch_won,
                image_url: formData.image_url
            });
            alert("Sikeres létrehozás");
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='p-5 content bg-whitesmoke text-center'>
            <h2>Új Sakk</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group row pb-3'>
                    <label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
                    <div>
                        <input type="text" id="name" name="name" className="form-control" autoComplete='name' onChange={handleChange} value={formData.name} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="birth_date" className='col-sm-3 col-form-label'> Születési év: </label>
                    <div>
                        <input type="number" id="birth_date" name="birth_date" className="form-control" autoComplete='birth_date' onChange={handleChange} value={formData.birth_date} />
                    </div>
                </div> 
                <div className='form-group row pb-3'>
                    <label htmlFor="world_ch_won" className='col-sm-3 col-form-label'> Bajnoki címek: </label>
                    <div>
                        <input type="number" id="world_ch_won" name="world_ch_won" className="form-control" autoComplete='world_ch_won' onChange={handleChange} value={formData.world_ch_won} />
                    </div>
                </div>
                <div className='form-group row pb-3'>
                    <label htmlFor="image_url" className='col-sm-3 col-form-label'> Kép: </label>
                    <div>
                        <input type="text" id="image_url" name="image_url" className="form-control" autoComplete='image_url' onChange={handleChange} value={formData.image_url} />
                    </div>
                </div>
                <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        </div>
    );
}
