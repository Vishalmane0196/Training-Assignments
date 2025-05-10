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
  const [prescription, setPrescription] = useState({});
  const [btnState, setBtnState] = useState(false);
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
      note: "",
    },
  });
  const handleSubmitData = (data) => {
    setPrescriptionSample((pre) => {
      let y = [...pre];
      y.push(data);
      return y;
    });
    console.log(data);
    setPrescription((pre) => {
      let note = [...(pre.note || []), data.note];
      let medicine = [...(pre.medicines || []), data.medicine];
      let capacity = [...(pre.capacity || []), data.capacity];
      let dosage = [...(pre.dosage || []), data.dose];
      console.log(note);
      let morning = [
        ...(pre.morning || []),
        data.Morning == "true"
          ? "before meal"
          : data.Morning == ""
          ? false
          : "after meal",
      ];

      let afternoon = [
        ...(pre.afternoon || []),
        data.Afternoon == "true"
          ? "before meal"
          : data.Afternoon == ""
          ? false
          : "after meal",
      ];

      let evening = [
        ...(pre.evening || []),
        data.Night == "true"
          ? "before meal"
          : data.Night == ""
          ? false
          : "after meal",
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
        notes: note,
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
        note: prev?.note.filter((_, i) => i !== indexToDelete) || [],
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
    setBtnState(true);
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
      navigate("/appointment");
    } catch (error) {
      setBtnState(false);
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
                  Medicine :
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
                  Capacity :
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
                  Dose :
                </label>
                <br />
                <input
                  {...register("dose", { required: true })}
                  placeholder="Enter Dosage"
                ></input>
              </div>
              <div>
                <label htmlFor="" className={styles.headerLabelMain}>
                  Duration :
                </label>
                <br />
                <input
                  {...register("duration", { required: true })}
                  type="number"
                  placeholder="Enter Duration"
                ></input>
              </div>
              <div>
                <label htmlFor="" className={styles.headerLabelMain}>
                  Note :
                </label>
                <br />
                <input
                  {...register("note")}
                  type="text"
                  placeholder="Enter Note"
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
                  <input {...register("Morning")} value={true} type="radio" />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Afternoon</pre>
                  </label>
                  <input {...register("Afternoon")} value={true} type="radio" />

                  <label htmlFor="" className={styles.labelOption}>
                    <pre>Night</pre>
                  </label>
                  <input {...register("Night")} value={true} type="radio" />
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
            <div>{index + 1}</div>
            <div>{prescriptionSampleData.medicine}</div>
            <div>{prescriptionSampleData.capacity}</div>
            <div>{prescriptionSampleData.dose}</div>
            <div>
              {`${Number(
                prescriptionSampleData.Morning == ""
                  ? 0
                  : prescriptionSampleData.Morning == "true"
                  ? true
                  : false
              )}-${Number(
                prescriptionSampleData.Afternoon == ""
                  ? 0
                  : prescriptionSampleData.Afternoon == "true"
                  ? true
                  : false
              )}-${Number(
                prescriptionSampleData.Night == ""
                  ? 0
                  : prescriptionSampleData.Night == "true"
                  ? true
                  : false
              )}`}
            </div>
            <div>{`${Number(
              prescriptionSampleData.Morning == ""
                ? 0
                : prescriptionSampleData.Morning == "false"
                ? true
                : false
            )}-${Number(
              prescriptionSampleData.Afternoon == ""
                ? 0
                : prescriptionSampleData.Afternoon == "false"
                ? true
                : false
            )}-${Number(
              prescriptionSampleData.Night == ""
                ? 0
                : prescriptionSampleData.Night == "false"
                ? true
                : false
            )}`}</div>
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
          disabled={btnState}
          onClick={() => {
            history.back();
          }}
          text={"Back"}
          type={"submit"}
          style={styles.backBtn}
        />
        <Button
          disabled={btnState}
          onClick={() => {
            handlePrescriptionData();
          }}
          text={"Submit"}
          type={"submit"}
          style={styles.submitBtn}
        />
      </div>
    </div>
  );
};

export default Prescription;
