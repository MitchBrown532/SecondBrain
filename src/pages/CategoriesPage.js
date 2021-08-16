import React from 'react'
import { Link } from 'react-router-dom'


function Categories() {
    const navBtnStyle = {
        color: 'black'
    }

    if (localStorage.getItem('is_logged_in') === "1"){
        return (
            <div className="main-page">

                <div className="center">
                    <button className="nav-btn">
                        <Link style={navBtnStyle} to="/in-tray">
                            In-Tray
                        </Link>
                    </button>
                </div>

                <div className="center">
                    <button className="nav-btn">
                        <Link style={navBtnStyle} to="/actions">
                            Actions
                        </Link>
                    </button>
                </div>

                <div className="center">
                    <button className="nav-btn">
                        <Link style={navBtnStyle} to="/projects">
                            Projects
                        </Link>
                    </button>
                </div>

                <div className="center">
                    <button className="nav-btn">
                        <Link style={navBtnStyle} to="/trash">
                            Trash
                        </Link>
                    </button>
                </div>


            </div>
        )
    }else{
        return(<h1>Please login before going to this page</h1>)
    }
}

export default Categories
