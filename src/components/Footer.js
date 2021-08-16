import React from 'react'
import { Link } from 'react-router-dom'

function Footer(){
    return(
        <div className="footer">
        
            <Link to='/in-tray'>
                <button className="footer-btn" onClick> In-tray</button>
            </Link>

            <Link to='/overview'>
                <button className="footer-btn" onClick >Overview</button>
            </Link>

            <Link to='/calender'>
                <button className="footer-btn" onClick >Calendar</button>
            </Link>
        
        </div>
    )
}

export default Footer
