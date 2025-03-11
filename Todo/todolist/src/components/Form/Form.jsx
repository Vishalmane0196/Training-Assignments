import React, { useContext, useState } from 'react'
import { Data } from '../../App';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
export default function Form() {
  const [todo,setTodo] = useState({});
  const datac =  useContext(Data);
  const todaydate = new Date().toISOString().split('T')[0];
  
  let navigate = useNavigate();
  const handleTodo = (e) =>{
    setTodo({...todo,[e.target.name]:e.target.value });
  }
  const [error , setErrors] = useState({});
  const handleForm = async (e) => {
    e.preventDefault();
    
    try {
      let response = await datac.client.post('/task/createTask',todo);
      if (response.data.status === 201) {
        console.log("Registration successful");
        e.target.reset();
        setErrors({});
        navigate('/user/addtodo');
        toast.success("Task added successfully")
      } 

    } catch (error) {
      console.error("Registration failed:", error);
     console.log("error msg",error.response.data.message);
     setErrors({
          'message' : error.response.data.message
     }
       
     )
    }

  }
  return (
    <>
      <form  className="form1" onSubmit={handleForm}>
        <div className="title">

          <div className="task-list">
            <div className="one">
              <div style={{display:'flex',justifyContent:"space-between"}}>
              <h4>Title <span id="star-red">*</span></h4>
              {error?.message ? <span className='error'>{error.message}
              </span> : null}
              </div>
              <input type="text" id="title" maxLength="20" pattern="[A-Za-z ]+"
                placeholder="Whats the title of your task?" name='title' required onChange={handleTodo} />
            </div>


            <div className="one">
              <h4>Description <span id="star-red">*</span></h4>
              <textarea id="description" onChange={handleTodo} name='description' maxLength="60" placeholder="Description of your task?" required></textarea>

            </div>

            <div className="two-div-DC">
              {/* <div className="category">
                  <h4>Category <span id="star-red">*</span> </h4>
                  <select name="category" id="category" required>
                    <option value="" disabled selected hidden>Choose a Category</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Others">Others</option>
                  </select>
                </div> */}
              <div className="due-date">
                <h4>Due date <span id="star-red">*</span></h4>
                <input type="date" id="due-date" min={todaydate} placeholder="MM/DD/YYYY" name='due_date' required onChange={handleTodo}  />
              </div>
              <button type='submit' className="sub-btn"> Add Task</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
