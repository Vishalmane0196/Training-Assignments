import React, { useState } from 'react'

import Card from '../card/Card.js';
import Toggle from '../toggle/Toggle.js';
import {plans} from '../../data/Info.js'
function Fromtwo(props) {
   const {handleClickback,flag,togglefun,selectedCard,setSelectedCard,sumitcallback} = props
  return (
    <form action="" className="" id="form2" onSubmit={sumitcallback} >
    <div className="form-title">
      <h1>Select your plan</h1>
      <p>You have the option of monthly or yearly billing</p>
    </div>
     <div className="form-content2">
      {plans.map((e,index)=>{
        return (
                <Card key={index} monthly={e.monthly} yearly={e.yearly} setSelectedCard={setSelectedCard} selectedCard={selectedCard} plan = {e.name} Icon={e.icon} flag={flag} />   
        )
      })}
       </div>

    <Toggle flag={flag} togglefun = {togglefun}/>

    <div className="btn2">
      <button id="back-btn1" className="back-btn-all" onClick={handleClickback}>Go Back</button>
      <button type="submit" className="next-btn-all" id="next-btn1">Next Step</button>
    </div>
  </form>
  )
}

export default Fromtwo;
