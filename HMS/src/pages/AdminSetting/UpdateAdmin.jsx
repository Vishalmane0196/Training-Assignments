import React, { useEffect, useState } from "react";
import styles from "src/style/UpdateAdmin.module.css";
import { toast } from "react-toastify";
import { deleteAdmin } from "../../redux/asyncThunkFuntions/admin.js";
import { fetchAllAdmins } from "../../redux/asyncThunkFuntions/admin.js";
import { useDispatch } from "react-redux";
import { Button } from "src/components/Button/Button.jsx";
import { getDoctor } from "src/redux/asyncThunkFuntions/user.js";
import AddDoctorAdminComponent from "src/components/AddDoctorAdmin/AddDoctorAdminComponent.jsx";
import { deleteDoctor } from "../../redux/asyncThunkFuntions/admin.js";

const UpdateAdmin = ({ access }) => {
  const [addAdminToggle, setAddAdminToggle] = useState(false);
  const [admins, setAdmins] = useState([]);

  const dispatch = useDispatch();
  const handleDeleteAdmin = async (email) => {
    try {
      if (access == "doctor") {
        await dispatch(deleteDoctor(email)).unwrap();
       fetchDoctors()
      } else {
        await dispatch(deleteAdmin(email)).unwrap();
        setAdmins((pre) =>
          pre.map((obj) =>
            obj.email == email
              ? { ...obj, ["status"]: "inactive", ["role"]: "User" }
              : obj
          )
        );
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleToggle = () => {
    setAddAdminToggle((pre) => !pre);
  };
  const fetchAdmins = async () => {
    try {
      let response = await dispatch(fetchAllAdmins()).unwrap();

      response = response.data.map((obj) => ({
        ...obj,
        ["status"]: "active",
        ["role"]: "Admin",
      }));
      setAdmins(response);
    } catch (error) {
      toast.error(error);
    }
  };
  const fetchDoctors = async () => {
    try {
      let response = await dispatch(getDoctor()).unwrap();
      setAdmins(response.data);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    if (access == "doctor") {
      fetchDoctors();
    } else {
      fetchAdmins();
    }
  }, [access]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>{access == "doctor" ? "Manage Doctors" : "Manage Admins"} </h2>
        <div className={styles.actions}>
          <button className={styles.addBtn} onClick={handleToggle}>
            {access == "doctor" ? "Add Doctor" : "Add Admin"}
          </button>
        </div>
      </div>
      <div className={styles.search}>
      
      </div>

      <div className={styles.tableWrapper}>
  <table className={styles.table}>
    <thead>
      <tr>
        <th>{access == "doctor" ? "Name" : "Id"}</th>
        <th>{access == "doctor" ? "specialization" : "Email"}</th>
        <th>{access == "doctor" ? "doctorInTime" : "Role"}</th>
        <th>{access == "doctor" ? "doctorOutTime" : "Status"}</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {admins.map((admin, index) => (
        <tr key={index}>
          <td>
            <div className={styles.item}>
              {access == "doctor" ? admin?.name : index + 1}
            </div>
          </td>
          <td>{access == "doctor" ? admin?.specialization : admin?.email}</td>
          <td>{access == "doctor" ? admin?.doctorInTime : admin?.role}</td>
          <td>
            <span
              className={
                access == "doctor"
                  ? null
                  : `${styles.status} ${
                      admin?.status == "active" ? styles.active : styles.disabled
                    }`
              }
            >
              {access == "doctor" ? admin?.doctorOutTime : admin?.status}
            </span>
          </td>
          <td>
            <Button
              style={styles.delete}
              type={"button"}
              onClick={() => {
                handleDeleteAdmin(
                  access == "doctor" ? admin?.doctor_id : admin.email
                );
              }}
              disabled={admin?.status == "inactive"}
              text={admin?.status == "inactive" ? "Removed" : "Remove"}
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {addAdminToggle && (
        <AddDoctorAdminComponent
          fetchData={access == "doctor" ? fetchDoctors : fetchAdmins}
          control={access == "doctor" ? true : false}
          onPopup={addAdminToggle}
          setPopupOff={setAddAdminToggle}
        />
      )}
    </div>
  );
};

export default UpdateAdmin;
