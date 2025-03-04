import React from 'react'

export default function Cardaddon({ addons, name, details, monthly, yearly, flag, setAddOns }) {
 async function addAddon() {
  await  setAddOns(e => {
      let y = [...e]
      y.includes(name) === true ? y = y.filter(p => p !== name) : y.push(name);
      let localData = JSON.parse(localStorage.getItem('data')) || {};
      localData.addAddon = y;
      localStorage.setItem('data', JSON.stringify(localData));
      return y;
    })
  }
  return (
    <label htmlFor={`${name}`} style={addons.includes(name) === true ? {backgroundColor:"hsl(217, 100%, 97%)"} :{backgroundColor:"white"}} className="card-addon">
      <div className="addcheck">
        <input className="checkbox-input" checked={addons.includes(name)}
          id={`${name}`} type="checkbox" onChange={addAddon} />
      </div>
      <div className="add-on-details">
        <h3>{name}</h3>
        <p>{details}</p>
      </div>
      <div className="add-on-extra-plan">
        <p id="add-on-plan">

          {flag === false ? `$${monthly}/mo` : `$${yearly}/yr`}
        </p>
      </div>
    </label>
  )
}
