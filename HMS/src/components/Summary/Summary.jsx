import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styles from "../../style/Summary.module.css"; // Ensure this contains the pagination styles
import { MyContext } from "../../utils/ContextApi";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const ContextApi = useContext(MyContext);
  const [details, setDetails] = useState({});
  const [patients, setAllPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1); // Default 1 page
  const itemsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientResponse = await ContextApi.axiosInstance.get(
          `/patient/getAllInfo?page=${currentPage}&limit=${itemsPerPage}`
        );

        console.log(patientResponse.data.data);
        console.log(patientResponse.data.totalPages);
        
       
        setAllPatients(patientResponse?.data?.data || []);
        ContextApi.setAllPatients(patientResponse?.data?.data);
        setTotalPages((patientResponse?.data?.pagination?.totalPatients/4) || 1);

        const summaryResponse = await ContextApi.axiosInstance.get(
          "/patient/getAgeGroup"
        );
        setDetails(summaryResponse.data.data || {});
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1);
  };
  const handleviewpage = (id) =>{
    navigate(`/admin/dashboard/allpatients/patientdetails/${id}`)
  }

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
        <div className={styles.tablecover}>
          <div className={styles["table-wrapper"]}>
            <table>
              <thead>
                <tr className={styles.heading}>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Disease Type</th>
                  <th>Mobile</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {patients.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                      <h3>No Patients Found</h3>
                    </td>
                  </tr>
                ) : (
                  patients.map((obj, index) => (
                    <tr key={index}>
                      <td>{obj.patient_id}</td>
                      <td>{obj.patient_name}</td>
                      <td>{obj.disease_type}</td>
                      <td>{obj.mobile_number}</td>
                      <td>
                        <div className={styles.icondiv}>
                          <i onClick={()=>handleviewpage(obj.patient_id)} className="fa-solid fa-eye"></i>
                          <i onClick={()=>handledletepatient(obj.patient_id)} className="fa-solid fa-trash"></i>
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
          pageRangeDisplayed={4}
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
    </div>
  );
};
