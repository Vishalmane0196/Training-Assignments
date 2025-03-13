import React, { useContext, useState } from 'react'
import image from '../../assets/To do list-pana.svg'
import img1 from '../../assets/img1.jpg'
import { Data } from '../../App';

export default function DashBoard() {
  const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const d = new Date();
let day = weekday[d.getDay()];
    let date = new Date();
    console.log()
    let data  =  useContext(Data);
    const handleLogOut= () =>{
      localStorage.removeItem('token');
      localStorage.removeItem('filtereStatus');
      localStorage.removeItem('isLogin')
      window.location.href = '/';
    }
   
  return (
    <>
     <div className="main1">
        <div className="header">
          <div className="header-date-section">
           <div style={{display:"flex",justifyContent:"space-between",alignItems:'center'}}>
           <h1>Today</h1>
          {data.isLogin ? <button className="clear-btn" onClick={handleLogOut}>Log Out</button> : null } 
           </div>
           
               <p> <span id="date">{date.getDate()}</span>, <span id="day">{day}</span> ,<span>{date.getFullYear()}</span></p>
            
          </div>
          
        </div>

        <div className="content">
          <ul className="pending-todo">

          </ul>
          <div id="to-list-div">
            <div className="illustration">
               
              <img src={ data.isLogin ? 
                image : img1} alt="Illustration" />
            </div>
           {data.isLogin ? <h2>Have a marvelous day off,</h2> : null} 
          
            

          </div>
        </div>
      </div>
    </>
  )
}