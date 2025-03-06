import React from 'react'
import { Outlet } from 'react-router'
export default function FormListCover() {
  return (
    <>
    <div className="inner padmr">
          <Outlet/>
          {/* {FORm and DisplayTodoList} */}
    </div>
    </>
  )
}
