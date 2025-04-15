import React, { useState } from "react";
import styles from "src/style/Prescription.module.css";
import { FaEdit, FaTrash, FaEllipsisV } from "react-icons/fa";
import { Button } from "src/components/Button/Button";
import { useForm } from "react-hook-form";

const patients = [
  {
    sl: "01",
    date: "01/01/2020",
    id: "0001",
    name: "Shamitra Dutta",
    email: "shamitra.dutta@gmail.com",
    contact: "01676044462",
    address: "T-7, Nurjahan Road, Mohammadpur",
    desc: "Fever",
  },
  {
    sl: "02",
    date: "02/01/2020",
    id: "0002",
    name: "Mosharraf Hossain",
    email: "mosharraf@gmail.com",
    contact: "01676044461",
    address: "T-9, Tajmohol Road, Mohammadpur",
    desc: "Back Pain",
  },
  {
    sl: "03",
    date: "03/01/2020",
    id: "0003",
    name: "Likhon Kormokar",
    email: "likhon@gmail.com",
    contact: "01676044463",
    address: "Bijoy Sarani, Dhaka",
    desc: "Corona",
  },
];

const Prescription = () => {
  const [prescription, setPrescription] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicine: "",
      capacity: "",
      dose: "one",
      beforeMorning: false,
      beforeAfternoon: false,
      beforeNight: false,
      afterMorning: false,
      afterAfternoon: false,
      afterNight: false,
    },
  });
  const handleSubmitData = (data) => {
    console.log(data);
    setPrescription((pre) => {
      let medicine = [...pre.medicines].push(data.medicine);
      let capacity = [...pre.capacity].push(data.capacity);
      let doces = [...pre.dosage].push(data.dose);
      
    });
    reset();
  };
  return (
    <div className={styles.container}>
      <h2>Prescriptions </h2>
      <div className={styles.filters}>
        <form action="" onSubmit={handleSubmit(handleSubmitData)}>
          <div className={styles.formDiv}>
            <div>
              <label htmlFor="">Medicine</label>
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
              <label htmlFor="">Capacity</label>
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
              <label htmlFor="">Dose</label>
              <br />
              <select {...register("dose", { required: true })} name="" id="">
                <option value="one">1</option>
                <option value="half">1/2</option>
              </select>
            </div>
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

          <Button
            text={"Add Prescription"}
            type={"submit"}
            style={styles.addBtn}
          />
        </form>
      </div>
      <div className={styles.tableWrapper}>
        <div className={`${styles.row} ${styles.header}`}>
          <div>#SL</div>
          <div>Date</div>
          <div>Patient ID</div>
          <div>Name</div>
          <div>Email</div>
          <div>Contact</div>
          <div>Address</div>
          <div>Desc</div>
          <div>Action</div>
        </div>
        {patients.map((patient, index) => (
          <div
            key={patient.id}
            className={`${styles.row} ${index === 1 ? styles.activeRow : ""}`}
          >
            <div>{patient.sl}</div>
            <div>{patient.date}</div>
            <div>{patient.id}</div>
            <div>{patient.name}</div>
            <div>{patient.email}</div>
            <div>{patient.contact}</div>
            <div>{patient.address}</div>
            <div>{patient.desc}</div>
            <div className={styles.actions}>
              <button>
                <FaEdit />
              </button>
              <button>
                <FaTrash />
              </button>
              <button>
                <FaEllipsisV />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescription;
