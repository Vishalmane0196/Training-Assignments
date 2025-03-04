import React from 'react'

export default function Toggle({togglefun , flag}) {
  return (
    <div className="plan-switch">
      <div className="monthly" style={flag === false ? {color:"hsl(213, 96%, 18%)"} : {color:"hsl(231, 11%, 63%)"}} >
          Monthly
      </div>
      <div className="toggle">
        <label className="toggle-switch">
          <input id="toggleer-input" onChange={togglefun} checked = {flag === true ? true : false} type="checkbox" />
          <span className="slider"></span>
        </label>
      </div>
      <div style={flag === true ? {color:"hsl(213, 96%, 18%)"} : {color:"hsl(231, 11%, 63%)"}} className="yearly">
         Yearly
      </div>
    </div>
  )
}
