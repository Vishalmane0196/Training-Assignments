import React, { useState } from 'react'
import image from '../../assets/To do list-pana.svg'
export default function DashBoard() {
    let date = new Date();
    console.log()
  return (
    <>
     <div className="main1">
        <div className="header">
          <div className="header-date-section">
            <h1>Today</h1>
           
               <p> <span id="date">{date.getDate()}</span>, <span id="day">{date.toString().slice(0,4)}</span></p>
            
          </div>

        </div>

        <div className="content">
          <ul className="pending-todo">

          </ul>
          <div id="to-list-div">
            <div className="illustration">
              <img src={image} alt="Illustration" />
            </div>
            <h2>Have a marvelous day off,</h2>
            <p>Schedule days off in the Productivity tab of your Settings menu.</p>

          </div>
        </div>

      </div>
    </>
  )
}
