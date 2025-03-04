import React from 'react'

export default function Side({step,name,state,setState,getValues}) {
  const changeStep = () =>{
  
      let value =  getValues(['name','email','phone']) ;
      
      if(value[0] && value[1] && value[2]){
        setState(pre=>{
          let localData = JSON.parse(localStorage.getItem('data')) || {};
          localData.step = step
          localStorage.setItem('data', JSON.stringify(localData))
          return step;

        });
      }
    
  }
  return (
    <>
    <div className="tab" >
               <div className="stage" style={state === step ? {backgroundColor:"hsl(206, 94%, 87%)",color:"hsl(213, 96%, 18%)"}:{backgroundColor:"transparent"}}><b    onClick={changeStep}>{step}</b></div>
               <div className="detail">
                 <h3 >STEP {step}</h3>
                 <h3 >{name}</h3>
               </div>
             </div>
    </>
  )
}
