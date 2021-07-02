import React from 'react'
import SideBar from './SideBar'
import Header from './Header'
import TranslationTable from './TranslationTable'

export default function Layout() {
    return (
        <div className="page-layout d-flex ">
            <SideBar/>
            <div className="main-content-page">
                <Header/>
                
                <div className="main-content">
                    <TranslationTable/>
                </div>
            </div>
        </div>
    )
}
