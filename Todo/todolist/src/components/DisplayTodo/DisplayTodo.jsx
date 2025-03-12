
import React, { useContext, useEffect, useState } from 'react';
import { Data } from '../../App';
import { NavLink } from 'react-router';
import { Todo } from '../Todo/Todo';
import { useRef } from 'react';

export default function DisplayTodo() {
  const [AllTOdos, setAllTOdos] = useState([]);
 
  const sortSelectRef = useRef(null);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState(localStorage.getItem('filtereStatus') || 'incomplete');
  const [search ,setSearch] = useState('');
  const datac = useContext(Data);

  const setFilterdata = async (status) => {
    setFilterStatus(prestatus => {
    
      localStorage.setItem('filtereStatus', status);
      return status;
    });
    
    if (sortSelectRef.current) {
      sortSelectRef.current.value = 'DEFAULT';
    }
    if (status === 'complete') {
      setFilteredTodos(AllTOdos.filter(todo => todo.status === 'complete'));
    } else {
      setFilteredTodos(AllTOdos.filter(todo => todo.status === 'incomplete'));
    }
  };

  const updateStatus = async (id) => {
    try {
      let response = await datac.client.patch(`/task/updateStatus/${id}`, { status: 'complete' });
      if (response.status === 200) {
        let response = await datac.client.get('/task/getTasks');
        setAllTOdos(response.data.data);
      } else {
        console.log("update failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      let response = await datac.client.delete(`/task/deleteTask/${id}`);
      console.log("Delete record:", response);
      if (response.status === 200) {
        let responsed = await datac.client.get('/task/getTasks');
        setAllTOdos(responsed.data.data);
      } else {
        console.log("delete failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const  handleSearch =(e)=>{
      setSearch(e.target.value);
  }

  const handleSort = (e) => {
    let sortedArray = [];
    if (e.target.value === 'AZ') {
      sortedArray = [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title));
    } else if (e.target.value === 'ZA') {
      sortedArray = [...filteredTodos].sort((a, b) => b.title.localeCompare(a.title));
    } else if (e.target.value === 'date') {
      sortedArray = [...filteredTodos].sort((a, b) => a.due_date.localeCompare(b.due_date));
    }
    setFilteredTodos(sortedArray);
  };


  // useEffect(() => {
  //   const getAllTodos = async () => {
  //     let response = await datac.client.get('/task/getTasks');
  //     console.log(response.data.data)
  //     setAllTOdos(response.data.data);
  //   };
  //   getAllTodos();
  // }, []);
  
  useEffect(() => {
    setFilterdata(filterStatus);
    console.log("filter status: " + filterStatus)
    return () => {
      localStorage.setItem('filtereStatus', 'incomplete')
    }
  }, [AllTOdos, filterStatus]);

  useEffect(()=>{
    const getSearchItems = setTimeout(()=>{
         async function getdata(){
          
            try {
              if(search === '') {
               
                let response = await datac.client.get('/task/getTasks');
                setAllTOdos(response.data.data);
                return;
              }
             
              let response = await datac.client.get(`/task/taskssearch/title/${search}`);
              setAllTOdos(response.data.data);
            } catch (error) {
             
              setAllTOdos([]);
            }
         }
         getdata();
    },500)
      return ()=>{clearTimeout(getSearchItems)}
  },[search])

  return (
    <>
      <div className="list">
        <div className="list-btns">
          <div className="list-btns-first">
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div >
                <NavLink to={'/user/display'} end className={({ isActive }) =>
                  isActive ? 'active padnav' : ''
                }>
                  <button onClick={() => setFilterdata('incomplete')} className="todo-btn">To-do</button>
                </NavLink>
                <NavLink to={'/user/display/completed'} className={({ isActive }) =>
                  isActive ? 'active padnav' : ''
                }>
                  <button onClick={() => setFilterdata('complete')} className="com-btn">Completed</button>
                </NavLink>
              </div>
              <div style={{display:"flex"}}>
                <input type="text"  placeholder="Search" onChange={handleSearch} className="search" />
                <select name="" id="sort" ref={sortSelectRef} defaultValue={'DEFAULT'} onChange={handleSort}>
                  <option value="DEFAULT" disabled  hidden>Default</option>
                  <option value="AZ">A-Z</option>
                  <option value="ZA">Z-A</option>
                  <option value="date">Oldest</option>
               
                </select>
              </div>
            </div>


          </div>

        </div>

        <ul className="ul-list">
          {  
          filteredTodos.length === 0 ? 
          
          <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: '100%', backgroundColor: " rgb(235, 233, 233)" }}> <h3>No Task</h3></div>   : 
          filteredTodos.map((todo, index) => (

            <Todo key={index} id={todo.id} title={todo.title} dec={todo.description} due={todo.due_date} updateStatus={updateStatus} deleteTodo={deleteTodo} status={todo.status} setAllTOdos={setAllTOdos} />
          )
          )}
        </ul>
      </div>
    </>
  );
}