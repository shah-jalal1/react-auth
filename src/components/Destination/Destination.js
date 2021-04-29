import React, { useState } from 'react';
import './Destination.css';
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMap from '../GoogleMap/GoogleMap'
import DestinationLocation from '../DestinationLocation/DestinationLocation';

const Destination = () => {

    const [location, setLocation] = useState([]);

    const handleSubmit = (e) => {
        const locations = [
            { id: 10, title: "Dhaka" },
            { id: 20, titile: "Khulna" }      
          ]
          setLocation(locations);
        e.preventDefault();
    }

    return (
        <div className="destination">
            {/* <div>
                <h1>Metro ticket</h1>
            </div>
            <div >
                <h1>Google Map</h1>
            </div> */}
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <div class="card">
                            <form onSubmit={handleSubmit}>
                                
                                <h6>Pick From</h6>
                                <input type="text" className="form-control" placeholder="Pick From"/>
                                <h6>Pick To</h6>
                                <input type="text" className="form-control" placeholder="Pick To"/>.<input className="form-control btn-danger" type="submit" value='Search' />
                            </form>
                        </div>
                        </div>
                        <div className="c" style={{ width: 'height: 100%' }}>
                            <GoogleMap />
                        </div>

                    </div>
                </div>

                
                    {location.map(cr => <DestinationLocation location={cr}></DestinationLocation>)}
                
                
            </div>
    );
};

export default Destination;

// export default GoogleApiWrapper({
//     apiKey: ("AIzaSyC7W2juAPLJzTX5YczqT1J_hK4U_Ppnm9g")
//   })(Destination)