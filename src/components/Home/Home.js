import React, { useEffect, useState } from 'react';
import image from '../images/bg.png'
import fakeData from '../Data/Data.json'
import Ticket from '../Ticket/Ticket';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(fakeData);
        // console.log(fakeData);
    } , []);

    const homeStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: '100% 100%'
    }

    const handleTicketClick = (ticket) => {
        console.log(ticket);
    }

    return (
        <div style={homeStyle}>
            {
                data.map(dt => <Ticket handleTicketClick={handleTicketClick} data={dt}></Ticket>)
            }
        </div>
    );
};

export default Home;