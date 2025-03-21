import React from 'react'

export const Form = () => {
  return (
   <>

<div class="form-container">
        <h2>Form Title</h2>
        <form action="#" method="post">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" required/>
 
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required/>
 
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" required/>
 
            <label for="message">Message</label>
            <textarea id="message" name="message" rows="4" required></textarea>
 
            <button type="submit">Submit</button>
        </form>
    </div>
  
   </>
    
  )
}
