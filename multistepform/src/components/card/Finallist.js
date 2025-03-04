import React from 'react'
import { plans, addOn } from '../../data/Info'
import List from './List.js';
export default function Finallist({ selectedCard, flag, addons, setState }) {
    let planvalue = 0;
    function calculate() {
        for (let i = 0; i < plans.length; i++) {
            if (plans[i].name === selectedCard) {
                if (flag === false) {
                    planvalue = plans[i].monthly
                    return `$${plans[i].monthly}/mo`

                } else {
                    planvalue = plans[i].yearly
                    return `$${plans[i].yearly}/yr`

                }
            }
        }

    }

    function Total() {

        let addonvalue = 0;
        addOn.map((list, i) => {
            if (addons.includes(list.name)) {
                addonvalue = addonvalue + (flag === false ? list.monthly : list.yearly)
            }
        })
        console.log("addon", addonvalue)
        console.log("planvalue", planvalue)
        return planvalue + addonvalue
    }
    
    return (
        <>
            <div className="form-content">
                <div className="summary-card">
                    <div className="plan-check">
                        <div className="left">
                            <p id="plan-show">{selectedCard}</p> <span id="month-show">{flag === false ? "monthly" : "yearly"}</span>
                            <a id="Change-plan" onClick={() => { setState(pre => pre = 2) }} href="#">Change</a>
                        </div>
                        <div className="right">
                            <p id="show-mon-yea-plan">{calculate()}</p>
                        </div>
                    </div>
                    <div className="line"></div>
                    <div className="plan-check-extra-plans">

                        {
                            addOn.map((list, i) => {
                                if (addons.includes(list.name)) {
                                    return (<List key={i} name={list.name} monthly={list.monthly} yearly={list.yearly} flag={flag} />)
                                }
                            })
                        }

                    </div>
                </div>
            </div>
            <div className="total-bill-div">
                <p >
                    Total
                    <span id="mon-year-total"></span>
                </p>
                <h3 id="total-price">
                    {
                        flag === false ? `$${Total()}/mo` : `$${Total()}/yr`}
                </h3>
            </div>

        </>
    )
}
