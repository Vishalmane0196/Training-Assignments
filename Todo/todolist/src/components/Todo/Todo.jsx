import React, { useContext, useState } from 'react'
import { Data } from '../../App';
export const Todo = ({id, title, dec, due,updateStatus,deleteTodo,status,setAllTOdos}) => {
   
    const datac = useContext(Data);
    const [edit, setEditTodo] = useState({
        title: title,
        description: dec
    });
    const [edittoggle , setEdittoggle] = useState(false);
    const handleUpdateData =(e)=>{
        setEditTodo({...edit, [e.target.name]: e.target.value })
    }
    const handleEdit = (e) => {
        setEdittoggle((pre)=>!pre);  
    }
    const sendDataToUpdate = async()=>{
        try {
          
            let response = await datac.client.put(`/task/updateTask/${id}`,{
                title: edit.title,
                description: edit.description,
  
            });
            if (response.data.status) {
                setEdittoggle((pre)=>!pre); 
                let response = await datac.client.get('/task/getTasks');
                setAllTOdos(response.data.data);
            } else {
              console.log("Registration failed:", response.data.message);
            }
            console.log("updateresponse :",response);
      
          } catch (error) {
            console.error("Registration failed:", error);
            datac.setIsLogin(false);
          }
      
    }
  return (
    <>
    <li>
            <div className="li-right">
              <h2>
                {edittoggle === false ? title : <input type="text" id="title" maxlength="20" pattern="[A-Za-z ]+"
                placeholder="Whats the title of your todo?" value={edit.title}  name='title' required onChange={handleUpdateData} />} 
              </h2>
              {console.log(edit)}
              <p className='dec'>{edittoggle === false ? dec :<input id="description" value={edit.description}  onChange={handleUpdateData} name='description' maxlength="60" placeholder="Description of your todo?" />} </p>
              <br />
              <p>Due: {due.slice(0,10)}</p>
            </div>
            <div className="li-left">
     {status === 'incomplete'? 
     edittoggle ?
      <button onClick={sendDataToUpdate}  className="edit"><i class="fa-solid fa-floppy-disk"></i></button> :  
      <button onClick={handleEdit}  className="edit"><i className="fa-regular fa-pen-to-square"></i></button> 
      : null}        
     {status === 'incomplete'?  <button onClick={()=>updateStatus(id)} className="check"> <i className="fa-solid fa-check"></i> </button> : null}  
              
              <button onClick={()=>deleteTodo(id)}  className="delete"> <i className="fa-solid fa-trash"></i> </button>
            </div>
          </li>
    </>
  )
}
