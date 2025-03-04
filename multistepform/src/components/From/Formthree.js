import React from 'react'
import {addOn} from '../../data/Info.js'
import Cardaddon from '../card/Cardaddon.js'
export default function Formthree({addons,handleClickback ,flag,setAddOns,sumitcallback,handleSubmit}) {
  return (
    <form action="" id="form3" onSubmit={handleSubmit(sumitcallback)}>
               <div className="form-title">
                 <h1>Pick add-ons</h1>
                 <p>Add-ons help enhance your gaming experince</p>
               </div>
               <div className="form-content3">
                {addOn.map((e,index)=>{
                  return (
                            <Cardaddon  key={index} name={e.name} details={e.detail} monthly={e.monthly} yearly={e.yearly} flag={flag}  setAddOns={setAddOns} addons={addons}
                            /> 
                  )
                }
              )}
               </div>
               <div className="btn3">
                 <button className="back-btn-all" id="back-btn2" onClick={handleClickback}>Go Back</button>
                 <button  type="submit" className="next-btn-all" id="next-btn2">Next Step</button>
               </div>
             </form>
  )
}
