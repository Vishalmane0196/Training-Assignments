import React, { useState } from "react";
import styles from "src/style/Prescription.module.css";
import { FaTrash } from "react-icons/fa";
import { Button } from "src/components/Button/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addPrescription } from "src/redux/asyncThunkFuntions/doctor";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const Prescription = () => {
  const param = useParams();
  const [prescription, setPrescription] = useState({});
  const [prescriptionSample, setPrescriptionSample] = useState([]);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      medicine: "",
      capacity: "",
      dose: "",
      beforeMorning: false,
      beforeAfternoon: false,
      beforeNight: false,
      afterMorning: false,
      afterAfternoon: false,
      afterNight: false,
      duration: "",
    },
  });
  const handleSubmitData = (data) => {
    console.log(data);
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
        data.beforeMorning && data.afterMorning
          ? "both"
          : data.beforeMorning
          ? "before meal"
          : data.afterMorning
          ? "after meal"
          : "none",
      ];

      let afternoon = [
        ...(pre.afternoon || []),
        data.beforeAfternoon && data.afterAfternoon
          ? "both"
          : data.beforeAfternoon
          ? "before meal"
          : data.afterAfternoon
          ? "after meal"
          : "none",
      ];

      let evening = [
        ...(pre.evening || []),
        data.beforeNight && data.afterNight
          ? "both"
          : data.beforeNight
          ? "before meal"
          : data.afterNight
          ? "after meal"
          : "none",
      ];

      return {
        courseDuration: parseInt(data.duration),
        appointment_id: parseInt(param.id),
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
    try {
      await dispatch(addPrescription(prescription)).unwrap();
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
                <input {...register("dose", { required: true })} placeholder="Enter Dosage"></input>
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
                  <input {...register("beforeMorning")} type="checkbox" />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Afternoon</pre>
                  </label>
                  <input {...register("beforeAfternoon")} type="checkbox" />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Night</pre>
                  </label>
                  <input {...register("beforeNight")} type="checkbox" />
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

                  <input {...register("afterMorning")} type="checkbox" />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Afternoon</pre>
                  </label>
                  <input {...register("afterAfternoon")} type="checkbox" />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Night</pre>
                  </label>
                  <input {...register("afterNight")} type="checkbox" />
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
          <div>Id</div>
          <div>Medicine</div>
          <div>Capacity</div>
          <div>Dosage</div>
          <div>Before Meal</div>
          <div>After Meal</div>
          <div>Action</div>
        </div>
        {console.log(prescription)}
        {console.log(prescriptionSample)}

        {prescriptionSample?.map((prescriptionSampleData, index) => (
          <div key={prescriptionSampleData.id} className={`${styles.row} `}>
            {" "}
            <div>{index}</div>
            <div>{prescriptionSampleData.medicine}</div>
            <div>{prescriptionSampleData.capacity}</div>
            <div>{prescriptionSampleData.dose}</div>
            <div>{`${Number(prescriptionSampleData.beforeMorning)}-${Number(
              prescriptionSampleData.beforeAfternoon
            )}-${Number(prescriptionSampleData.beforeNight)}`}</div>
            <div>{`${Number(prescriptionSampleData.afterMorning)}-${Number(
              prescriptionSampleData.afterAfternoon
            )}-${Number(prescriptionSampleData.afterNight)}`}</div>
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
