import React from 'react'



const Card = ({ monthly, yearly, selectedCard, setSelectedCard, Icon, flag, plan }) => {
  const handleCardClick = () => {
    setSelectedCard((pre) => {
      let localData = JSON.parse(localStorage.getItem('data')) || {};
      localData.plan = plan;
      localStorage.setItem('data', JSON.stringify(localData));
      return plan;
    });


  };
  return (
    <div className="card " onClick={handleCardClick} style={{ backgroundColor: selectedCard === plan ? 'hsl(217, 100%, 97%)' : 'white' }} >
      <div className="card-img">
        <img src={Icon} alt="img" />
      </div>
      <div className="card-detail">
        <h3>{plan}</h3>
        <p value="9" id="month-price1">{flag === false ? `$${monthly}/mo` : `$${yearly}/yr`}</p>
        {flag === false ? null : <p id="year-free">2 month free</p>}
      </div>
    </div>
  )
}
export default Card