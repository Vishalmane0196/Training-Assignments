import React, { useState } from "react";
import styles from "src/style/Prescription.module.css";
import { FaTrash } from "react-icons/fa";
import { Button } from "src/components/Button/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  addPrescription,
  updatePrescription,
} from "src/redux/asyncThunkFuntions/doctor";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
const Prescription = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const edit = searchParams.get("edit");
  console.log(edit);
  const [prescription, setPrescription] = useState({});
  const [prescriptionSample, setPrescriptionSample] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      medicine: "",
      capacity: "",
      dose: "",
      Morning: "",
      Afternoon: "",
      Night: "",
      duration: "",
    },
  });
  const handleSubmitData = (data) => {
    console.log(data);
    data.Morning = data.Morning == "true" ? true : false;
    data.Afternoon = data.Afternoon == "true" ? true : false;
    data.Night = data.Night == "true" ? true : false;

    setPrescriptionSample((pre) => {
      let y = [...pre];
      y.push(data);
      return y;
    });

    setPrescription((pre) => {
      let medicine = [...(pre.medicines || []), data.medicine];
      let capacity = [...(pre.capacity || []), data.capacity];
      let dosage = [...(pre.dosage || []), data.dose];

      let morning = [
        ...(pre.morning || []),
        data.Morning ? "before meal" : "after meal",
      ];

      let afternoon = [
        ...(pre.afternoon || []),
        data.Afternoon ? "before meal" : "after meal",
      ];

      let evening = [
        ...(pre.evening || []),
        data.Night ? "before meal" : "after meal",
      ];

      return {
        courseDuration: parseInt(data.duration),
        appointment_id: parseInt(id),
        medicines: medicine,
        capacity: capacity,
        dosage: dosage,
        morning: morning,
        afternoon: afternoon,
        evening: evening,
      };
    });
    reset();
  };

  const handleDelete = (indexToDelete) => {
    const newSample = prescriptionSample.filter(
      (_, index) => index !== indexToDelete
    );
    setPrescriptionSample(newSample);

    setPrescription((prev) => {
      return {
        medicines: prev.medicines?.filter((_, i) => i !== indexToDelete) || [],
        capacity: prev.capacity?.filter((_, i) => i !== indexToDelete) || [],
        dosage: prev.dosage?.filter((_, i) => i !== indexToDelete) || [],
        morning: prev.morning?.filter((_, i) => i !== indexToDelete) || [],
        afternoon: prev.afternoon?.filter((_, i) => i !== indexToDelete) || [],
        evening: prev.evening?.filter((_, i) => i !== indexToDelete) || [],
      };
    });
  };

  const handlePrescriptionData = async () => {
    let promise = dispatch(
      edit !== "null"
        ? updatePrescription(prescription)
        : addPrescription(prescription)
    ).unwrap();
    toast.promise(promise, {
      pending: "Uploading Prescription...",
      success: "SuccessFully Uploaded",
      error: "Error Uploading",
    });
    try {
      await promise;
      navigate("/doctor/dashboard/viewAppointment");
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <h2>Create Prescription</h2>
      <div className={styles.filters}>
        <form action="" onSubmit={handleSubmit(handleSubmitData)}>
          <div className={styles.formDiv}>
            <div className={styles.topDiv}>
              <div>
                <label htmlFor="" className={styles.headerLabelMain}>
                  Medicine
                </label>
                <br />
                <input
                  {...register("medicine", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Medicine Name"
                />
              </div>
              <div>
                <label htmlFor="" className={styles.headerLabelMain}>
                  Capacity
                </label>
                <br />
                <input
                  {...register("capacity", {
                    required: true,
                  })}
                  type="text"
                  placeholder="Capacity "
                />
              </div>

              <div>
                <label htmlFor="" className={styles.headerLabelMain}>
                  Dose
                </label>
                <br />
                <input
                  {...register("dose", { required: true })}
                  placeholder="Enter Dosage"
                ></input>
              </div>
              <div>
                <label htmlFor="" className={styles.headerLabelMain}>
                  Duration
                </label>
                <br />
                <input
                  {...register("duration", { required: true })}
                  type="number"
                  placeholder="Enter Duration"
                ></input>
              </div>
            </div>

            <div>
              <div className={styles.medicineDuration}>
                <div className={styles.labelDiv}>
                  <label htmlFor="" className={styles.labelHead}>
                    Before Meal
                  </label>

                  <label htmlFor="" className={styles.labelOption}>
                    <pre> Morning</pre>
                  </label>
                  <input
                    {...register("Morning")}
                    value={true}
                    required
                    type="radio"
                  />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Afternoon</pre>
                  </label>
                  <input
                    {...register("Afternoon")}
                    value={true}
                    required
                    type="radio"
                  />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Night</pre>
                  </label>
                  <input
                    {...register("Night")}
                    value={true}
                    required
                    type="radio"
                  />
                </div>

                <div className={styles.labelDiv}>
                  <label
                    htmlFor=""
                    className={`${styles.labelHead} ${styles.marginCheck}`}
                  >
                    After Meal
                  </label>

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Morning</pre>
                  </label>

                  <input {...register("Morning")} value={false} type="radio" />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Afternoon</pre>
                  </label>
                  <input
                    {...register("Afternoon")}
                    value={false}
                    type="radio"
                  />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Night</pre>
                  </label>
                  <input {...register("Night")} value={false} type="radio" />
                </div>
              </div>
            </div>
          </div>

          <Button
            text={"Add Prescription"}
            type={"submit"}
            style={styles.addBtn}
          />
        </form>
      </div>
      <div className={styles.tableWrapper}>
        <div className={`${styles.row} ${styles.header}`}>
          <div>Sr.No</div>
          <div>Medicine</div>
          <div>Capacity</div>
          <div>Dosage</div>
          <div>Before Meal</div>
          <div>After Meal</div>
          <div>Action</div>
        </div>

        {prescriptionSample?.map((prescriptionSampleData, index) => (
          <div key={prescriptionSampleData.id} className={`${styles.row} `}>
            {" "}
            {console.log(prescriptionSampleData)}
            <div>{index}</div>
            <div>{prescriptionSampleData.medicine}</div>
            <div>{prescriptionSampleData.capacity}</div>
            <div>{prescriptionSampleData.dose}</div>
            <div>
              {`${Number(prescriptionSampleData.Morning)}-${Number(
                prescriptionSampleData.Afternoon
              )}-${Number(prescriptionSampleData.Night)}`}
            </div>
            <div>{`${Number(!prescriptionSampleData.Morning)}-${Number(
              !prescriptionSampleData.Afternoon
            )}-${Number(!prescriptionSampleData.Night)}`}</div>
            <div className={styles.actions}>
              <button
                onClick={() => {
                  handleDelete(index);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        disabled={prescriptionSample.length == 0 ? true : false}
        className={styles.btnCover}
      >
        <Button
          onClick={() => {
            handlePrescriptionData();
          }}
          text={"Submit Prescription"}
          type={"submit"}
          style={styles.submitBtn}
        />
      </div>
    </div>
  );
};

export default Prescription;
