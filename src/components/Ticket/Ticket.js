import React from 'react';
import './Ticket.css'


const Ticket = (props) => {
    // console.log(props.data);
    const {title, price} = props.data;
    // console.log(title);
    
    return (
        <div className="ticketInfo">
            <div>
                <h1> {title}</h1>
            </div>

            <div>
            <button onClick={() => props.handleTicketClick(props.data)} className="btn btn-primary">Select Player</button> {/* Added Bootstrap */}
            </div>

            <div>
                <h1> {price}</h1>
            </div>

        </div>
    );
};

export default Ticket;