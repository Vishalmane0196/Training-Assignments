import React from 'react'
import TableCSS from '../../style/UserPatientTable.module.css'

export const UserPatientTable = () => {
  return (
    <>
      <div className={TableCSS.tablecontainer}>
        <div className={TableCSS["table-wrapper"]}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
                <th>Start Date</th>
                <th>Office</th>
                <th>Extension</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(1)].map((_, index) => (
                <tr key={index}>
                  <td>Michael Silva</td>
                  <td>Marketing Designer</td>
                  <td>2012/11/27</td>
                  <td>London</td>
                  <td>1581</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={TableCSS.footerdiv}></div>
      </div>
    </>
  )
}
