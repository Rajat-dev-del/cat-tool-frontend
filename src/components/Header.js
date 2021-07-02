import React from 'react'
import user from '../assets/img/user.jpg'
import file from '../assets/img/file.png'
import fileIconName from '../assets/img/fileIconName.svg'


export default function Header() {
    return (
        <div className="header">
            <header className="d-flex align-items-center justify-content-between">
                <div className="assignment-name">
                    <span>
                        <img src={file} alt="file icon"/>
                    </span>
                    <p>Sample file name goes here.pptx</p>
                    <span className="file-name-icon">
                        <img src={fileIconName} alt="file name icon"/>
                    </span>
                </div>
                <div className="profile">
                    <span>Hi, Rajat</span>
                    <img src={user} alt="user"/>
                </div>
            </header>
        </div>
    )
}
