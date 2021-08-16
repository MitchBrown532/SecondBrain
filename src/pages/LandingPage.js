import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage(){
    const navBtnStyle ={
        color: 'white'
    }

    return(
        <div>
            <Link style={navBtnStyle} to="/log-in">
            <div className="center">
                <button className="logIn-btn">Log In</button>
            </div>
            </Link>
            <div className="center">
            <p className="general-info">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Nullam a arcu a magna commodo finibus nec non lectus. 
            Nam felis ex, vehicula in feugiat sit amet, commodo faucibus quam. 
            Sed facilisis nisi ut hendrerit vehicula. Phasellus libero dolor, mattis quis lorem id, tempor rhoncus neque. 
            Mauris imperdiet sollicitudin eros sed eleifend. Integer mattis mi id cursus faucibus. Integer orci risus, sagittis in laoreet sit amet, euismod ac sem. Proin rutrum convallis dapibus. 
            Vestibulum accumsan, turpis at aliquet vulputate, nisi leo varius lectus, aliquet congue ex mauris a purus. 
            Vestibulum hendrerit laoreet turpis, vitae tristique sem semper et. Nullam urna sapien, efficitur dapibus neque et, venenatis convallis neque. 
            Curabitur eleifend volutpat lacinia. In vehicula euismod dignissim.</p>
            </div>
        </div>
    )
}

export default LandingPage