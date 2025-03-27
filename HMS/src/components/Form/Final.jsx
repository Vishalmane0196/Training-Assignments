import React from 'react'

export const Final = ({setStep,setPatientId}) => {
  setTimeout(()=>{
      localStorage.setItem('step',0);
      localStorage.removeItem('file_preview');
      localStorage.removeItem('upload_status');
      setStep(0);
      setPatientId(null);
  },2000)
  return (
    <>
      <h1>Form Submitted Successfully!</h1>
      <p>Thank you for filling out the form.</p>
    </>
  )
}
