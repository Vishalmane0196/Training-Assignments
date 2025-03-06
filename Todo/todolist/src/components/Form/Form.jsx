import React, { useContext, useState } from 'react'
import { Data } from '../../App';
import { useNavigate } from 'react-router';
export default function Form() {
  const [todo,setTodo] = useState({});
  const datac =  useContext(Data);
  let navigate = useNavigate();
  const handleTodo = (e) =>{
    setTodo({...todo,[e.target.name]:e.target.value });
  }

  const handleForm = async (e) => {
    e.preventDefault();
    
    try {
      let response = await datac.client.post('/task/createTask',todo);
      if (response.data.status === 201) {
        console.log("Registration successful");
        e.target.reset();
        navigate('/user/addtodo');
      } else {
        console.log("Registration failed:", response.data.message);
      }
      console.log(response);

    } catch (error) {
      console.error("Registration failed:", error);
      datac.setIsLogin(false);
    }

  }
  return (
    <>
      <form  className="form1" onSubmit={handleForm}>
        <div className="title">

          <div className="task-list">
            <div className="one">
              <h4>Title <span id="star-red">*</span></h4>
              <input type="text" id="title" maxlength="20" pattern="[A-Za-z ]+"
                placeholder="Whats the title of your todo?" name='title' required onChange={handleTodo} />
            </div>


            <div className="one">
              <h4>Description </h4>
              <textarea id="description" onChange={handleTodo} name='description' maxlength="60" placeholder="Description of your todo?"></textarea>

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
                <input type="date" id="due-date" placeholder="MM/DD/YYYY" name='due_date' required onChange={handleTodo}  />
              </div>
              <button type='submit' className="sub-btn"> Add Todo</button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
