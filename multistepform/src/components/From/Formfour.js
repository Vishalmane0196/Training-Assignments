import React from 'react'
import Finallist from '../card/Finallist.js'
export default function Formfour({selectedCard,handleClickback,sumitcallback,flag,addons,setState}) {
  let localData = JSON.parse(localStorage.getItem('data')) || {};

    if(!localData.personal){setState(1)}

  return (
    <form action="" id="form4" onSubmit={sumitcallback}>
               <div className="form-title">
                 <h1>Finishing up</h1>
                 <p>Double-check everything looks OK before confirming </p>
               </div>
                <Finallist flag={flag} addons={addons} selectedCard={selectedCard} setState={setState} />
               <div className="btn4">
                 <button className="back-btn-all" onClick={handleClickback} >Go Back</button>
                 <button  className="confirm-btn-all" type='submit' >Confirm</button>
               </div>
             </form>
  )
}
