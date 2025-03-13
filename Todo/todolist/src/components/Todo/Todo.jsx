// import React, { useContext, useEffect, useState } from "react";
// import { Data } from "../../App";
// export const Todo = ({
//   id,
//   title,
//   dec,
//   due,
//   updateStatus,
//   deleteTodo,
//   status,
//   setAllTOdos,
// }) => {
//   const datac = useContext(Data);
//   const [edit, setEditTodo] = useState({
//     title: title,
//     description: dec,
//     due_date: (new Date(due.slice(0, 10)).toISOString().split("T")[0])
//   });
//   const [edittoggle, setEdittoggle] = useState(false);

//   const handleUpdateData = (e) => {
//     setEditTodo({ ...edit, [e.target.name]: e.target.value });
//   };
//   const handleEdit = (e) => {
//     setEdittoggle((pre) => !pre);
//   };
//   const sendDataToUpdate = async () => {
//     try {
//       if (edit.title !== title || edit.description !== dec) {
//         let response = await datac.client.put(`/task/updateTask/${id}`, {
//           title: edit.title,
//           description: edit.description,
//           due_date:  edit.due_date
//         });
//         if (response.data.status) {
//           setEdittoggle((pre) => !pre);
//           let response = await datac.client.get("/task/getTasks");
//           setAllTOdos(response.data.data);
//         } else {
//           console.log("Registration failed:", response.data.message);
//         }
//       } else {
//         setEdittoggle((pre) => !pre);
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };
//   useEffect(() => {
//     setEditTodo({ title, description: dec }); // Reset state when props change
//     setEdittoggle(false); // Close edit mode
//   }, [id, title, dec,due]);

//   return (
//     <>
//       <li>
//         <div className="li-right">
//           <h2>
//             {edittoggle === false ? (
//               title
//             ) : (
//               <input
//                 type="text"
//                 id="title"
//                 maxLength="20"
//                 pattern="[A-Za-z ]+"
//                 placeholder="Whats the title of your todo?"
//                 value={edit.title}
//                 name="title"
//                 required
//                 onChange={handleUpdateData}
//               />
//             )}
//           </h2>

//           <p className="dec">
//             {edittoggle === false ? (
//               dec
//             ) : (
//               <input
//                 id="description"
//                 value={edit.description}
//                 onChange={handleUpdateData}
//                 name="description"
//                 maxLength="60"
//                 required
//                 placeholder="Description of your todo?"
//               />
//             )}
//           </p>
// {console.log(edit.due_date)}
//           <p style={{ display: "block", marginTop: "0.3rem" }}>
//             {edittoggle === false ? (
//               `Due date: ${due?.slice(0, 10)}`
//             ) : (
//               <input
//                 type="date"
//                 name="due_date"
//                 value={edit.due_date}
//                 onChange={handleUpdateData}
//                 min={new Date().toISOString().split("T")[0]}
//               />
//             )}
//           </p>
//         </div>
//         <div className="li-left">
//           {status === "incomplete" ? (
//             edittoggle ? (
//               <button onClick={sendDataToUpdate} className="edit">
//                 <i className="fa-solid fa-floppy-disk"></i>
//               </button>
//             ) : (
//               <button onClick={handleEdit} className="edit">
//                 <i className="fa-regular fa-pen-to-square"></i>
//               </button>
//             )
//           ) : null}

//           {edittoggle ? null : status === "incomplete" ? (
//             <button onClick={() => updateStatus(id)} className="check">
//               {" "}
//               <i className="fa-solid fa-check"></i>{" "}
//             </button>
//           ) : null}

//           {edittoggle ? null : (
//             <button onClick={() => deleteTodo(id)} className="delete">
//               {" "}
//               <i className="fa-solid fa-trash"></i>{" "}
//             </button>
//           )}
//         </div>
//       </li>
//     </>
//   );
// };


import React, { useContext, useEffect, useState } from "react";
import { Data } from "../../App";

export const Todo = ({
  id,
  title,
  dec,
  due,
  updateStatus,
  deleteTodo,
  status,
  setAllTOdos,
}) => {
  const datac = useContext(Data);
  const [edit, setEditTodo] = useState({
    title: title,
    description: dec,
    due_date: new Date(due).toISOString().split("T")[0],
  });
  const [edittoggle, setEdittoggle] = useState(false);

  const handleUpdateData = (e) => {
    setEditTodo({ ...edit, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEdittoggle((pre) => !pre);
  };

  const sendDataToUpdate = async () => {
    try {
      if (edit.title !== title || edit.description !== dec || edit.due_date !== due) {
        let response = await datac.client.put(`/task/updateTask/${id}`, {
          title: edit.title,
          description: edit.description,
          due_date: edit.due_date,
        });
        if (response.data.status) {
          setEdittoggle((pre) => !pre);
          let response = await datac.client.get("/task/getTasks");
          setAllTOdos(response.data.data);
        } else {
          console.log("Update failed:", response.data.message);
        }
      } else {
        setEdittoggle((pre) => !pre);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // useEffect(() => {
  //   setEditTodo({
  //     title,
  //     description: dec,
  //     due_date: new Date(due).toISOString().split("T")[0],
  //   });
  //   setEdittoggle(false);
  // }, [id, title, dec, due]);

  return (
    <>
      <li>
        <div className="li-right">
          <h2>
            {edittoggle === false ? (
              title
            ) : (
              <input
                type="text"
                id="title"
                maxLength="20"
                pattern="[A-Za-z ]+"
                placeholder="What's the title of your todo?"
                value={edit.title}
                name="title"
                required
                onChange={handleUpdateData}
              />
            )}
          </h2>

          <p className="dec">
            {edittoggle === false ? (
              dec
            ) : (
              <input
                id="description"
                value={edit.description}
                onChange={handleUpdateData}
                name="description"
                maxLength="60"
                required
                placeholder="Description of your todo?"
              />
            )}
          </p>

          <p style={{ display: "block", marginTop: "0.3rem" }}>
            {edittoggle === false ? (
              `Due date: ${due?.slice(0, 10)}`
            ) : (
              <input
                type="date"
                name="due_date"
                value={edit.due_date}
                onChange={handleUpdateData}
                min={new Date().toISOString().split("T")[0]}
              />
            )}
          </p>
        </div>
        <div className="li-left">
          {status === "incomplete" ? (
            edittoggle ? (
              <button onClick={sendDataToUpdate} className="edit">
                <i className="fa-solid fa-floppy-disk"></i>
              </button>
            ) : (
              <button onClick={handleEdit} className="edit">
                <i className="fa-regular fa-pen-to-square"></i>
              </button>
            )
          ) : null}

          {edittoggle ? null : status === "incomplete" ? (
            <button onClick={() => updateStatus(id)} className="check">
              <i className="fa-solid fa-check"></i>
            </button>
          ) : null}

          {edittoggle ? null : (
            <button onClick={() => deleteTodo(id)} className="delete">
              <i className="fa-solid fa-trash"></i>
            </button>
          )}
        </div>
      </li>
    </>
  );
};