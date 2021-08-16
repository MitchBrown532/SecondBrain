import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'

function Navbar(){
    const history = useHistory();
    const navBtnStyle ={
        color: 'white'
    }
    
    return(
        <div>
            <div className = "center">
                <button className="back-btn" onClick={() => history.goBack()}>Back</button>
            </div>

            <div className="center">
                <Link style={navBtnStyle} to="/home">
                    <i className="fas fa-brain"></i>
                </Link>
                <h1>Second Brain</h1>
            </div>

            <div className="center">
                <button className="search-btn">Search</button>  
            </div>
        </div>
    )
}

export default Navbar
