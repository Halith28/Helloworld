import React from 'react';
import './Home.css';
import {useHistory } from "react-router-dom";
function Home(props) {
    const history = useHistory();
    const redirectToApplication = () => {
        history.push('/adddoctor');
    }
    
    return(
        <div className="Welcome" >
            <h2 style={{color:"white"}}>Medical Application</h2>
            <button  type="primary" className="btn" style={{margin:"10% auto", backgroundColor:"#ff0066", color:"white"}} onClick={() => redirectToApplication()}>Add Doctor</button>
            <button type="primary" className="btn" style={{margin:"20px", backgroundColor:"#ff0066", color:"white"}} onClick={() => redirectToApplication()}>Add Category</button> 
        </div>
    )
}

export default Home;
