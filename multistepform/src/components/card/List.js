import React from 'react'

export default function List({ name, monthly, yearly, flag}) {
  return (
    <>
               <div id="extra-plan-show" >
                       <p>{name} </p>
                       <h5 >{flag === false ? `$${monthly}/mo` : `$${yearly}/yr`}</h5>
                     </div>
    </>
  )
}
