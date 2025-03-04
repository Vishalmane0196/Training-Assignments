import React from 'react'
import thanku from '../../assets/images/icon-thank-you.svg'
import Thank from './thanku.module.css'
export default function ThankU() {
    setTimeout(()=>{
      localStorage.clear();
        window.location.reload();
    },5000)
  return (
    <>
    <div className={Thank.thankyou}>
            <div className={Thank.thankyoucontent}>
              <div className={Thank.thankyouimg}>
                <img src={thanku} alt="thankyou"/>
              </div>
              <h1>Thank you!</h1>
              <h4>Thanks for confirming your subscription! We hope you have Fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.</h4>
            </div>
          </div>
    </>
  )
}
