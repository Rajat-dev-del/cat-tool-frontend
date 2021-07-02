import React from 'react'
import logo from '../assets/img/logo.png'

export default function SideBar() {
    return (
        <div className="side-bar">
            <div className="logo">
                <img src={logo} alt="logo"/>
            </div>
        </div>
    )
}
