import React, { useState } from 'react'
import "./Searchbox.css";
import "./Shop.css"
import ShopItem from './ShopItem';
import { useContext } from 'react'
import AppointmentContext from '../context/appointmentContext';
import { useNavigate } from 'react-router-dom'
const Shops = () => {
    const context = useContext(AppointmentContext)
    const { setId } = context
    const [city, setCity] = useState("")
    const [shops, setShops] = useState([])
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/bookingdetails");
    }
    const onChange = (e) => {
        setCity(e.target.value)
    }
    const onBook = (id) => {
        setId(id)
        handleClick()
    }
    const onSearch = async () => {
        const response = await fetch(`http://localhost:5000/api/shops/fetchallshops`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token")
            },
            body: JSON.stringify({ city: city }),
        });
        const json = await response.json()
        console.log(json)
        setShops(json)
    }
    return (
        <>
            <div className='container'>
                <div className=' mad center'>
                    <div style={{ width: "700px" }}>
                        <div className="input-group mb-3">
                            <input onChange={onChange} type="text" className="form-control" placeholder="Search your City" aria-label="Recipient's username" aria-describedby="button-addon2" />
                            <button onClick={onSearch} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
                        </div>
                        <div className="input-group mb-3">
                            <input className="form-control" type="time" id="appt" name="appt"></input>
                            <input className="form-control" type="date" id="birthday" name="birthday"></input>
                        </div>
                    </div>
                </div>
                <div className='mad center'>
                    <div style={{ width: "700px" }}>
                        {shops.length ? shops.map((shop) => {
                            return <><ShopItem key={shop._id} onBook={onBook} shop={shop} /></>
                        })
                            : <h2 style={{ color: "white" }}>No Shops available</h2>}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Shops