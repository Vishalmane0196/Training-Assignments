import React, { useEffect, useState } from "react";
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
import { Breadcrumb } from "src/components/Breadcrum/Breadcrumb";
const Prescription = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  const [selectedTime, setSelectedTime] = useState();
  const id = searchParams.get("id");
  const edit = searchParams.get("edit");
  const [prescription, setPrescription] = useState({});
  const [btnState, setBtnState] = useState(false);
  const [prescriptionSample, setPrescriptionSample] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, setValue, watch, handleSubmit, reset, getValues } = useForm(
    {
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
    }
  );

  const watchFields = watch(["Morning", "Afternoon", "Night"]);

  const handleCheck = (field, value) => {
    const currentValue = watch(field);
    console.log(field);
    console.log(value);
    console.log(currentValue);
    if (currentValue.includes("on")) {
      setValue(field, true);
    } else {
      setValue(field, false);
    }
  };

  const handleSubmitData = (data) => {
    setPrescriptionSample((pre) => {
      let y = [...pre];
      y.push(data);
      return y;
    });

    setPrescription((pre) => {
      let note = data.note || "";
      let medicine = data.medicine;
      let capacity = data.capacity;

      let morning =
        data.Morning == "true"
          ? "before meal"
          : data.Morning == ""
          ? false
          : "after meal";

      let afternoon =
        data.Afternoon == "true"
          ? "before meal"
          : data.Afternoon == ""
          ? false
          : "after meal";

      let evening =
        data.Night == "true"
          ? "before meal"
          : data.Night == ""
          ? false
          : "after meal";

      let dosage = {
        morning: data.Morning == "" ? "" : data.dose,
        afternoon: data.Afternoon == "" ? "" : data.dose,
        night: data.Night == "" ? "" : data.dose,
      };

      return {
        appointment_id: parseInt(id),
        medicines: [...(pre.medicines || []), medicine],
        capacity: [...(pre.capacity || []), capacity],
        notes: [...(pre.notes || []), note],
        dosage: [...(pre.dosage || []), dosage],
        courseDuration: data.duration,
        morning: [...(pre.morning || []), morning],
        afternoon: [...(pre.afternoon || []), afternoon],
        evening: [...(pre.evening || []), evening],
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
        note: prev.note?.filter((_, i) => i !== indexToDelete) || [],
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
    <>
      <Breadcrumb />
      <div className={styles.container}>
        <h2 className={styles.headerLabel}>Create Prescription</h2>
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
                  {/* --------- BEFORE MEAL --------- */}
                  <div className={styles.labelDiv}>
                    <label className={styles.labelHead}>Before Meal :</label>

                    <input
                      type="checkbox"
                      {...register("Morning")}
                      checked={watchFields[0] == true}
                      onChange={(e) => {
                        const { onChange } = register("Morning");
                        onChange(e);
                        handleCheck("Morning", true);
                      }}
                      id="morningBefore"
                      className={styles.customRadio}
                    />

                    <label
                      htmlFor="morningBefore"
                      className={styles.customLabel}
                    >
                      Morning
                    </label>

                    <input
                      type="checkbox"
                      {...register("Afternoon")}
                      checked={watchFields[1] === true}
                      onChange={() => handleCheck("Afternoon", true)}
                      id="afternoonBefore"
                      className={styles.customRadio}
                    />
                    <label
                      htmlFor="afternoonBefore"
                      className={styles.customLabel}
                    >
                      Afternoon
                    </label>

                    <input
                      type="checkbox"
                      {...register("Night")}
                      checked={watchFields[2] === true}
                      onChange={() => handleCheck("Night", true)}
                      id="eveningBefore"
                      className={styles.customRadio}
                    />
                    <label
                      htmlFor="eveningBefore"
                      className={styles.customLabel}
                    >
                      Evening
                    </label>
                  </div>

                  {/* --------- AFTER MEAL --------- */}
                  <div className={styles.labelDiv}>
                    <label
                      className={`${styles.labelHead} ${styles.marginCheck}`}
                    >
                      After Meal :
                    </label>

                    <input
                      type="checkbox"
                      {...register("Morning")}
                      checked={watchFields[0] === false}
                      onChange={() => handleCheck("Morning", false)}
                      id="morningAfter"
                      className={styles.customRadio}
                    />
                    <label
                      htmlFor="morningAfter"
                      className={styles.customLabel}
                    >
                      Morning
                    </label>

                    <input
                      type="checkbox"
                      {...register("Afternoon")}
                      checked={watchFields[1] === false}
                      onChange={() => handleCheck("Afternoon", false)}
                      id="afternoonAfter"
                      className={styles.customRadio}
                    />
                    <label
                      htmlFor="afternoonAfter"
                      className={styles.customLabel}
                    >
                      Afternoon
                    </label>

                    <input
                      type="checkbox"
                      {...register("Night")}
                      checked={watchFields[2] === false}
                      onChange={() => handleCheck("Night", false)}
                      id="eveningAfter"
                      className={styles.customRadio}
                    />
                    <label
                      htmlFor="eveningAfter"
                      className={styles.customLabel}
                    >
                      Evening
                    </label>
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
    </>
  );
};

export default Prescription;
