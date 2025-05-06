import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../../style/Summary.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePatient,
  fetchAllPAtients,
} from "../../redux/asyncThunkFuntions/admin";
import { fetchPatientCardData } from "../../redux/asyncThunkFuntions/admin";
import DeletePopUp from "src/components/Setting/Delete/DeletePopUp";
import { toast } from "react-toastify";
const Summary = () => {
  const [deleteState, setState] = useState(false);
  const [id, setID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();

  const { details, patientList, totalPages } = useSelector(
    (state) => state.patient
  );
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      await dispatch(fetchAllPAtients(currentPage)).unwrap();
      await dispatch(fetchPatientCardData("get")).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const deletePatientFun = async (id) => {
    try {
      await dispatch(deletePatient(id)).unwrap();
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };

  const handleViewPage = (id) => {
    navigate(`/allpatients/patientdetails/${id}`);
  };

  return (
    <div className={styles.dashboard}>
      <div>
        <div className={styles.summary}>
          {Object.keys(details).map((key, index) => (
            <div key={index} className={styles.summaryCard}>
              <p>{key}</p>
              <h3>{details[key]}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.leaderboard}>
        <div className={styles.tableCover}>
          <div className={styles["table-wrapper"]}>
            <table>
              <thead>
                <tr className={styles.heading}>
                  <th>Sr. no</th>
                  <th>Patient Name</th>
                  <th>Mobile No</th>
                  <th>Age</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {patientList.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "20px" }}
                    >
                      <h3>No Patients Found</h3>
                    </td>
                  </tr>
                ) : (
                  patientList.map((obj, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{obj?.patient_name}</td>
                      <td>{obj?.mobile_number}</td>
                      <td>{obj?.age}</td>
                      <td>
                        <div className={styles.iconDiv}>
                          <i
                            title="view patient"
                            onClick={() => handleViewPage(obj?.patient_id)}
                            className="fa-solid fa-eye"
                          ></i>
                          <i
                            title="delete patient"
                            disabled={
                              obj?.status == "Cancelled" || obj?.status == null
                            }
                            onClick={() => {
                              if (
                                obj?.status == "Cancelled" ||
                                obj?.status == null
                              ) {
                                setID(obj.patient_id);
                                setState(true);
                              } else {
                                return;
                              }
                            }}
                            className={`fa-solid fa-trash ${
                              obj?.status == "Cancelled" || obj?.status == null
                                ? null
                                : styles.disabled
                            }`}
                          ></i>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={styles.pagination}
          pageClassName={styles.pageItem}
          pageLinkClassName={styles.pageLink}
          activeClassName={styles.active}
          previousClassName={styles.pageItem}
          nextClassName={styles.pageItem}
          previousLinkClassName={styles.pageLink}
          nextLinkClassName={styles.pageLink}
          breakClassName={styles.pageItem}
          breakLinkClassName={styles.pageLink}
        />
      </div>
      {deleteState && (
        <DeletePopUp
          deleteFunction={deletePatientFun}
          id={id}
          deleteState={deleteState}
          setDeleteState={setState}
        />
      )}
    </div>
  );
};
export default Summary;
