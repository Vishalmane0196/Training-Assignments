import React, { useEffect } from 'react'

export const Final = ({setStep,setPatientId}) => {
 useEffect(()=>{
   localStorage.setItem('step',0);
     localStorage.removeItem('file_preview');
     localStorage.removeItem('upload_status');
     setStep(0);
     setPatientId(null);
 })
  return (
    <>
      <h1>Form Submitted Successfully!</h1>
      <p>Thank you for filling out the form.</p>
    </>
  )
}
