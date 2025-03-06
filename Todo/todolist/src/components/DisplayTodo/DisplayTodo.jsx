// import React, { useContext, useEffect, useState } from 'react'
// import { Data } from '../../App';
// import { NavLink } from 'react-router';
// import { Todo } from '../Todo/Todo';
// export default function DisplayTodo() {
 
//   const [AllTOdos, setAllTOdos] = useState([]);
//   const [filteredTodos, setFilteredTodos] = useState([]);
//   const datac = useContext(Data);

//   const setFilterdata = async(toggle) => {
    
//     if (toggle) {
      
//       setFilteredTodos(AllTOdos.filter(todo => todo.STATUS === 'complete'));
//     }
//     else {
      
//       setFilteredTodos(AllTOdos.filter(todo => todo.STATUS === 'incomplete'));
//     }
//   }
//   const updateStatus = async (id) => {
//     try {
//       let response = await datac.client.patch(`/task/updateStatus/${id}`, { status: 'complete' });
//       if (response.status === 200) {
//         let response = await datac.client.get('/task/getTasks');
//         setAllTOdos(response.data.data);
//       } else {
//         console.log("delete failed:", response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
  

//   const deleteTodo = async(id) => {
//     try {
//       let response = await datac.client.delete(`/task/deleteTask/${id}`);
//       console.log("Delete record : ", response);
//       if (response.status === 200) {
//         let responsed = await datac.client.get('/task/getTasks');
//         // setAllTOdos(responsed.data.data);
  
//         // // Reapply the filter based on the current URL
//         if (location.pathname === '/user/display/completed') {
//           console.log("i am here to do");
//           setFilteredTodos([...responsed.data.data].filter(todo => todo.STATUS === 'complete'));
//         } else {
//           console.log("i am not here");
//           setFilteredTodos([...responsed.data.data].filter(todo => todo.STATUS === 'incomplete'));
//         }
//       } else {
//         console.log("delete failed:", response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleSort = (e) => {
//     let sortedArray = [];
//     if (e.target.value === 'AZ') {
//       sortedArray = [...filteredTodos].sort((a, b) => a.TITLE.localeCompare(b.TITLE))
//     }
//     else if (e.target.value === 'ZA') {
//       sortedArray = [...filteredTodos].sort((a, b) => b.TITLE.localeCompare(a.TITLE))
//     }
//     else if (e.target.value === 'date') {
//       sortedArray = [...filteredTodos].sort((a, b) => a.DUE_DATE.localeCompare(b.DUE_DATE));
//     }
//     setFilteredTodos(sortedArray);
//   }
//   const handleSearch = async(e) =>{     
//       if(e.target.value === "")
//       {
//         let response = await datac.client.get('/task/getTasks');
//         setAllTOdos(response.data.data);
//       }
//       else{
//         let response = await datac.client.get(`/task/taskssearch/title/${e.target.value}`);
//         setAllTOdos(response.data.data);
//       }
        
    
//   }
//   useEffect(() => {
//     const getAllTodos = async () => {
//       let response = await datac.client.get('/task/getTasks');
//       setAllTOdos(response.data.data);
//       setFilterdata(false);
//       console.log("hwloo")
//     }
//     getAllTodos();
//   }, [])
  
//   useEffect(() => {
//     setFilterdata(false);
//   }, [AllTOdos]);

//   return (
//     <>
//       <div className="list">
//         <div className="list-btns">
//           <div className="list-btns-first">
//             <NavLink to={'/user/display'} end className={({ isActive }) =>
//               isActive ? 'active' : ''

//             }>  <button onClick={() => setFilterdata(false)} className="todo-btn">To-do</button> </NavLink>
//             <NavLink to={'/user/display/completed'} className={({ isActive }) =>
//               isActive ? 'active' : ''

//             } > <button onClick={() => setFilterdata(true)} className="com-btn">Completed</button> </NavLink>
//         {window.location.pathname === '/user/display/completed' ? null : <input type="text" placeholder="Search" onChange={handleSearch} className="search" />}    
//             <select name="" id="sort" onChange={handleSort}>
//               <option value="" disabled defaultValue hidden>Sort</option>
//               <option value="AZ">A-Z</option>
//               <option value="ZA">Z-A</option>
//               <option value="date">Oldest</option>
//               <option value="latest">Latest</option>
//             </select>
//           </div>
//           <button className="clear-btn">Clear All</button>
//         </div>

//         <ul className="ul-list">


//           {
//             filteredTodos.map((todo, index) => {
//               console.log("helkjjdhd");

//               return (<Todo key={index} id={todo.ID} title={todo.TITLE} dec={todo.DESCRIPTION} due={todo.DUE_DATE} updateStatus={updateStatus} deleteTodo={deleteTodo} status={todo.STATUS} setAllTOdos={setAllTOdos}/>)
//             })
//           }

//         </ul>
//       </div>
//     </>
//   )
// }

import React, { useContext, useEffect, useState } from 'react';
import { Data } from '../../App';
import { NavLink } from 'react-router';
import { Todo } from '../Todo/Todo';

export default function DisplayTodo() {
  const [AllTOdos, setAllTOdos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterStatus, setFilterStatus] = useState('incomplete'); // New state variable
  const datac = useContext(Data);

  const setFilterdata = (status) => {
    setFilterStatus(status);
    if (status === 'complete') {
      setFilteredTodos(AllTOdos.filter(todo => todo.STATUS === 'complete'));
    } else {
      setFilteredTodos(AllTOdos.filter(todo => todo.STATUS === 'incomplete'));
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

  const handleSort = (e) => {
    let sortedArray = [];
    if (e.target.value === 'AZ') {
      sortedArray = [...filteredTodos].sort((a, b) => a.TITLE.localeCompare(b.TITLE));
    } else if (e.target.value === 'ZA') {
      sortedArray = [...filteredTodos].sort((a, b) => b.TITLE.localeCompare(a.TITLE));
    } else if (e.target.value === 'date') {
      sortedArray = [...filteredTodos].sort((a, b) => a.DUE_DATE.localeCompare(b.DUE_DATE));
    }
    setFilteredTodos(sortedArray);
  };

  const handleSearch = async (e) => {
    if (e.target.value === "") {
      let response = await datac.client.get('/task/getTasks');
      setAllTOdos(response.data.data);
    } else {
      let response = await datac.client.get(`/task/taskssearch/title/${e.target.value}`);
      setAllTOdos(response.data.data);
    }
  };

  useEffect(() => {
    const getAllTodos = async () => {
      let response = await datac.client.get('/task/getTasks');
      setAllTOdos(response.data.data);
    };
    getAllTodos();
  }, []);

  useEffect(() => {
    setFilterdata(filterStatus);
  }, [AllTOdos, filterStatus]);

  return (
    <>
      <div className="list">
        <div className="list-btns">
          <div className="list-btns-first">
            <NavLink to={'/user/display'} end className={({ isActive }) =>
              isActive ? 'active' : ''
            }>
              <button onClick={() => setFilterdata('incomplete')} className="todo-btn">To-do</button>
            </NavLink>
            <NavLink to={'/user/display/completed'} className={({ isActive }) =>
              isActive ? 'active' : ''
            }>
              <button onClick={() => setFilterdata('complete')} className="com-btn">Completed</button>
            </NavLink>
            {window.location.pathname === '/user/display/completed' ? null : <input type="text" placeholder="Search" onChange={handleSearch} className="search" />}
            <select name="" id="sort" onChange={handleSort}>
              <option value="" disabled defaultValue hidden>Sort</option>
              <option value="AZ">A-Z</option>
              <option value="ZA">Z-A</option>
              <option value="date">Oldest</option>
              <option value="latest">Latest</option>
            </select>
          </div>
          <button className="clear-btn">Clear All</button>
        </div>

        <ul className="ul-list">
          {filteredTodos.map((todo, index) => (
            <Todo key={index} id={todo.ID} title={todo.TITLE} dec={todo.DESCRIPTION} due={todo.DUE_DATE} updateStatus={updateStatus} deleteTodo={deleteTodo} status={todo.STATUS} setAllTOdos={setAllTOdos} />
          ))}
        </ul>
      </div>
    </>
  );
}