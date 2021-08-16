import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ModalAdd } from '../components/ModalAdd';


class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
          show: false
        };
    }
    
    render(){
        const navBtnStyle = {
            color: 'black'
        }
        const closeModalHandler = () => this.setState({show:false});
        const openModalHandler = () => this.setState({show:true});


            return (
                <div className="main-page">
    
                    <div className="center">
                        { this.state.show ? <div onClick={closeModalHandler}></div> : null }
                        <button onClick={openModalHandler} className="nav-btn" style={navBtnStyle}>Add Item</button> 
                        <ModalAdd show={this.state.show} close={closeModalHandler} />                 
                    </div>
    
                    <div className="center">
                        <button className="nav-btn">
                            <Link style={navBtnStyle} to="/categories">
                                Categories
                            </Link>
                        </button>
                    </div>
    
                    <div className="center">
                        <button className="nav-btn">
                            <Link style={navBtnStyle} to="/overview">
                                Overview
                            </Link>
                        </button>
                    </div>
                </div>
            )
        }
    }


export default MainPage
