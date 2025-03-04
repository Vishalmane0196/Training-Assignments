import React, { useState } from 'react';

export default  function Formone({errors,register, handleSubmit, sumitcallback}) {
const [isFill , setIsFilled] =  useState(true);
  // const handleInputChange = (e) => {
  //   let localData =JSON.parse(localStorage.getItem('data')) || {};
  //   localData['personal'] = {...localData['personal'], [e.target.name]: e.target.value };
    
  //   localStorage.setItem('data', JSON.stringify(localData));

  //   if (e.target.value.trim() !== '') {
  //     setIsFilled(true);
  //   } else {
  //     setIsFilled(false);
  //   }
  // };

  return (
    <form id="form1" onSubmit={handleSubmit(sumitcallback)}>
      <div className="form-title">
        <h1>Personal info</h1>
        <p>Please provide your name, email and contact number.</p>
      </div>
      <div className="form-content">
        <label htmlFor="name">Name</label>
        <label id="name-error">{errors.name?.message}</label>
        <input {...register("name", { required: true })} name='name'   id='name' placeholder="e.g. Vishal Mane" />
        
        <label htmlFor="email">Email Address</label>
        <label id="email-error">{errors.email?.message}</label>
        <input {...register("email", { required: true })}    id='email' name='email' placeholder="e.g. vishal12345mane00@gmail.com" />
        
        <label htmlFor="phone">Phone Number</label>
        <label id="mobile-error">{errors.phone?.message.slice(0,25)}</label>
        <input {...register("phone", { required: true })}   name='phone' id='phone' placeholder="e.g. +917666379916" />
      </div>
      <div className="btn">
        <button style={isFill === false ? {opacity:"0.7",cursor:'not-allowed'} : {opacity:"1",cursor:'pointer'}}  disabled={isFill === false ? true : false} type="submit" className="next-btn-all first-next-btn">Next Step</button>
      </div>
    </form>
  );
}