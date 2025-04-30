import React, { useEffect, useState } from "react";
import viewPatientCSS from "../../style/ViewPatient.module.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "src/components/Input/Input";
import { Radio } from "src/components/Radio/Radio";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller } from "react-hook-form";
import {
  setPatientID,
  setCount,
  setStep,
} from "src/redux/slices/multistepform/formSlice";

import { Select } from "src/components/Select/Select";

const ViewPatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin, isDoctor } = useSelector((state) => state.auth);
  const { patientList } = useSelector((state) => state.patient);

  const param = useParams();
  const [patientData, setPatientData] = useState();
  const [personalUpdate, setPersonalUpdate] = useState(false);
  const [FamilyUpdate, setFamily] = useState(false);
  const [DiseaseUpdate, setDiseaseUpdate] = useState(false);
  const [DocumentUpdate, setDocumentUpdate] = useState(false);
  const [documents, setDocuments] = useState([]);

  const {
    register,
    trigger,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...patientData,
      mother_diabetic: patientData?.mother_diabetic == 1 ? "true" : "false",
      mother_cardiac_issue:
        patientData?.mother_cardiac_issue == 1 ? "true" : "false",
      mother_bp: patientData?.mother_bp == 1 ? "true" : "false",
      father_diabetic: patientData?.father_diabetic == 1 ? "true" : "false",
      father_cardiac_issue:
        patientData?.father_cardiac_issue == 1 ? "true" : "false",
      father_bp: patientData?.father_bp == 1 ? "true" : "false",
      patient_id: patientData?.patient_id || "",
    },
  });

  //------------------
  const handleUpdatePersonalData = () => {
    documentToLocal();
    dispatch(setPatientID(parseInt(param.id)));
    dispatch(setStep(0));
    dispatch(setCount(3));
    isAdmin
      ? navigate("/admin/dashboard/addpatient")
      : isDoctor
      ? navigate("/doctor/dashboard/addpatient")
      : navigate("/user/dashboard/addpatient");
  };
  const handleUpdateFamilyData = () => {
    documentToLocal();
    dispatch(setPatientID(parseInt(param.id)));
    dispatch(setStep(1));
    dispatch(setCount(3));
    isAdmin
      ? navigate("/admin/dashboard/addpatient")
      : isDoctor
      ? navigate("/doctor/dashboard/addpatient")
      : navigate("/user/dashboard/addpatient");
  };

  const handleUpdateDiseaseData = () => {
    documentToLocal();
    dispatch(setPatientID(parseInt(param.id)));
    dispatch(setStep(2));
    dispatch(setCount(3));
    isAdmin
      ? navigate("/admin/dashboard/addpatient")
      : isDoctor
      ? navigate("/doctor/dashboard/addpatient")
      : navigate("/user/dashboard/addpatient");
  };
  const documentToLocal = () => {
    let object = {};
    documents.map((obj) => {
      object = {
        ...object,
        [obj.document_type]: btoa(
          `${import.meta.env.VITE_CLOUDINARY_BASE_URL}${obj.document_url}`
        ),
      };
    });
    localStorage.setItem("file_preview", JSON.stringify(object));

    let object2 = {};
    documents.map((obj) => {
      object2 = {
        ...object2,
        [obj.document_type]: true,
      };
    });
    console.log(object2);
    localStorage.setItem("upload_status", JSON.stringify(object));
  };
  const handleUpdateDocumentData = () => {
    documentToLocal();
    dispatch(setPatientID(parseInt(param.id)));
    dispatch(setStep(3));
    dispatch(setCount(3));

    isAdmin
      ? navigate("/admin/dashboard/addpatient")
      : isDoctor
      ? navigate("/doctor/dashboard/addpatient")
      : navigate("/user/dashboard/addpatient");
  };

  const getPatientData = async () => {
    let id = param.id;
    if (patientList.length == 0) {
      navigate("/user/dashboard/viewpatients");
    }
    let fountPatient = patientList.find((obj) => obj.patient_id == id);
    setPatientData(fountPatient);
    if (fountPatient) {
      reset({
        ...fountPatient,
        date_of_birth: fountPatient?.date_of_birth
          ? new Date(fountPatient.date_of_birth).toISOString().split("T")[0]
          : "",
        is_diabetic: fountPatient?.is_diabetic == 1 ? "true" : "false",
        cardiac_issue: fountPatient?.cardiac_issue == 1 ? "true" : "false",
        blood_pressure: fountPatient?.blood_pressure == 1 ? "true" : "false",
        mother_diabetic: fountPatient.mother_diabetic == 1 ? "true" : "false",
        mother_cardiac_issue:
          fountPatient.mother_cardiac_issue == 1 ? "true" : "false",
        mother_bp: fountPatient.mother_bp == 1 ? "true" : "false",
        father_diabetic: fountPatient.father_diabetic == 1 ? "true" : "false",
        father_cardiac_issue:
          fountPatient.father_cardiac_issue == 1 ? "true" : "false",
        father_bp: fountPatient.father_bp == 1 ? "true" : "false",
      });
      setDocuments(fountPatient?.documents);
    }
  };

  useEffect(() => {
    getPatientData();
  }, [param.id, reset]);

  return (
    <>
      
      <div className={viewPatientCSS.container}>
        <Accordion expanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              padding: "1rem 1rem 1rem 1rem",
            }}
          >
            Personal Information
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={viewPatientCSS.sectionCover}
              style={
                personalUpdate
                  ? { backgroundColor: "#dddddd68" }
                  : { backgroundColor: "#dddddd68" }
              }
            >
              <div className={viewPatientCSS.textAndIconCover}>
                <h1 className={viewPatientCSS.title}>Personal Information</h1>
                <div className={viewPatientCSS.iconCoverDivDeleteEdit}>
                  <i
                    onClick={() => {
                      handleUpdatePersonalData();
                    }}
                    title="edit"
                    class="fa-solid fa-pencil"
                  ></i>
                </div>
              </div>
              <form>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Input
                    label="Patient Name"
                    require="Patient Name"
                    register={register}
                    trigger={trigger}
                    fieldName="patient_name"
                    errors={errors}
                    type="text"
                    placeholder="Enter Full Name."
                  />

                  <Input
                    label="Birth Date"
                    require="Birth Date"
                    register={register}
                    trigger={trigger}
                    fieldName="date_of_birth"
                    errors={errors}
                    type="date"
                  />

                  <div className={viewPatientCSS.fieldCoverDiv}>
                    <label className={viewPatientCSS.fieldLabel}>
                      Gender <span className={viewPatientCSS.star}>*</span>
                    </label>
                    <Controller
                      control={control}
                      name="gender"
                      rules={{ required: "Gender is required" }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <Select
                          onBlur={onBlur}
                          onChange={onChange}
                          value={value}
                          options={[
                            "Male",
                            "Female",
                            {
                              other: [
                                "Non Binary",
                                "Trans",
                                "Asexual",
                                "Bisexual",
                              ],
                            },
                          ]}
                        />
                      )}
                    />
                    <p className={viewPatientCSS.fielderror}>
                      {errors.gender && (
                        <span className="error">{errors.gender.message}</span>
                      )}
                    </p>
                  </div>

                  <Input
                    label="Country"
                    require="Country Name "
                    register={register}
                    trigger={trigger}
                    fieldName="country_of_origin"
                    errors={errors}
                    type="text"
                    placeholder="Enter Country."
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    marginTop: "1rem",
                    gap: "2rem",
                  }}
                >
                  <Input
                    label="Weight"
                    require="Weight "
                    register={register}
                    trigger={trigger}
                    fieldName="weight"
                    errors={errors}
                    type="number"
                    placeholder="Enter weight."
                    min={10}
                    max={100}
                  />

                  <Input
                    label="Height"
                    require="Height "
                    register={register}
                    trigger={trigger}
                    fieldName="height"
                    errors={errors}
                    type="number"
                    placeholder="Enter Height."
                    min="4.50"
                    max="9.90"
                    step="0.01"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                  }}
                >
                  <Radio
                    label="Blood Pressure"
                    require="Blood Pressure"
                    register={register}
                    fieldName="blood_pressure"
                    errors={errors}
                    type="radio"
                  />

                  <Radio
                    label="Diabetic "
                    require="Diabetic Field"
                    register={register}
                    fieldName="is_diabetic"
                    errors={errors}
                    type="radio"
                  />

                  <Radio
                    label="Cardiac "
                    require="Cardiac Field"
                    register={register}
                    fieldName="cardiac_issue"
                    errors={errors}
                    type="radio"
                  />
                </div>
              </form>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              padding: "1rem 1rem 1rem 1rem",
            }}
          >
            Family Information
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={viewPatientCSS.sectionCover}
              style={
                FamilyUpdate
                  ? { backgroundColor: "#dddddd68" }
                  : { backgroundColor: "#dddddd68" }
              }
            >
              <div className={viewPatientCSS.textAndIconCover}>
                <h1 className={viewPatientCSS.title}>Family Information</h1>
                <div className={viewPatientCSS.iconCoverDivDeleteEdit}>
                  <i
                    onClick={() => {
                      handleUpdateFamilyData();
                    }}
                    class="fa-solid fa-pencil"
                  ></i>
                </div>
              </div>
              <form>
                <div style={{ display: "flex", gap: "3rem" }}>
                  <Input
                    label="Father Name"
                    require="Father Name"
                    register={register}
                    trigger={trigger}
                    fieldName="father_name"
                    errors={errors}
                    type="text"
                    placeholder="Enter Father Name."
                  />

                  <Input
                    label="Father Country"
                    require="Country Name"
                    register={register}
                    trigger={trigger}
                    fieldName="father_country_origin"
                    errors={errors}
                    type="text"
                    placeholder="Country Name."
                  />

                  <Input
                    label="Father Age "
                    require="Age"
                    register={register}
                    trigger={trigger}
                    fieldName="father_age"
                    errors={errors}
                    type="number"
                    min={10}
                    max={100}
                    placeholder="Enter Age."
                  />
                  <div className={viewPatientCSS.fieldCoverDiv}>
                    <label className={viewPatientCSS.fieldLabel}>
                      Father BP <span className={viewPatientCSS.star}>*</span>
                    </label>
                    <select
                      className={viewPatientCSS.inputfield}
                      {...register("father_bp", {
                        required: "Blood pressure is required",
                      })}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>
                    <p className={viewPatientCSS.fielderror}>
                      {errors.father_bp && (
                        <span>{errors.father_bp.message}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: "3rem", marginTop: "2rem" }}
                >
                  <Input
                    label="Mother Name"
                    require="Mother Name"
                    register={register}
                    trigger={trigger}
                    fieldName="mother_name"
                    errors={errors}
                    type="text"
                    placeholder="Enter Mother Name."
                  />

                  <Input
                    label="Mother Country"
                    require="Country Name"
                    register={register}
                    trigger={trigger}
                    fieldName="mother_country_origin"
                    errors={errors}
                    type="text"
                    placeholder="Country Name."
                  />

                  <Input
                    label="Mother Age "
                    require="Age"
                    register={register}
                    trigger={trigger}
                    fieldName="mother_age"
                    errors={errors}
                    type="number"
                    min={10}
                    max={100}
                    placeholder="Enter Age."
                  />

                  <div className={viewPatientCSS.fieldCoverDiv}>
                    <label className={viewPatientCSS.fieldLabel}>
                      Mother BP <span className={viewPatientCSS.star}>*</span>
                    </label>
                    <select
                      className={viewPatientCSS.inputfield}
                      {...register("mother_bp", {
                        required: "Blood pressure is required",
                      })}
                    >
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </select>

                    <p className={viewPatientCSS.fielderror}>
                      {errors.mother_bp && (
                        <span>{errors.mother_bp.message}</span>
                      )}
                    </p>
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: "3rem", marginTop: "2rem" }}
                >
                  <Radio
                    label="Mother Diabetic "
                    require="Diabetic"
                    register={register}
                    fieldName="mother_diabetic"
                    errors={errors}
                    type="radio"
                  />

                  <Radio
                    label=" Mother Cardiac Issue"
                    require="Cardiac"
                    register={register}
                    fieldName="mother_cardiac_issue"
                    errors={errors}
                    type="radio"
                  />
                  <Radio
                    label="Father Diabetic"
                    require="Diabetic"
                    register={register}
                    fieldName="father_diabetic"
                    errors={errors}
                    type="radio"
                  />

                  <Radio
                    label="Father Cardiac Issue "
                    require="Cardiac"
                    register={register}
                    fieldName="father_cardiac_issue"
                    errors={errors}
                    type="radio"
                  />
                </div>
              </form>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              padding: "1rem 1rem 1rem 1rem",
            }}
          >
            Disease Information
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={viewPatientCSS.sectionCover}
              style={
                DiseaseUpdate
                  ? { backgroundColor: "#dddddd68" }
                  : { backgroundColor: "#dddddd68" }
              }
            >
              <div className={viewPatientCSS.textAndIconCover}>
                <h1 className={viewPatientCSS.title}>Disease Information</h1>
                <div className={viewPatientCSS.iconCoverDivDeleteEdit}>
                  <i
                    onClick={() => {
                      handleUpdateDiseaseData();
                    }}
                    class="fa-solid fa-pencil"
                  ></i>
                </div>
              </div>
              <form>
                <div
                  style={{ display: "flex", gap: "3rem", marginBottom: "2rem" }}
                >
                  <Input
                    label="Disease Type"
                    require="Disease Type"
                    register={register}
                    trigger={trigger}
                    fieldName="disease_type"
                    errors={errors}
                    type="text"
                    placeholder="Enter Disease Name."
                  />

                  <Input
                    label="Disease Description"
                    require="Description require"
                    register={register}
                    trigger={trigger}
                    fieldName="disease_description"
                    errors={errors}
                    type="text"
                    placeholder="Enter Description."
                  />
                </div>
              </form>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              fontSize: "1.5rem",
              fontWeight: 600,
              padding: "1rem 1rem 1rem 1rem",
            }}
          >
            Document Information
          </AccordionSummary>
          <AccordionDetails>
            <div
              className={viewPatientCSS.sectionCover}
              style={
                DocumentUpdate
                  ? { backgroundColor: "#dddddd68" }
                  : { backgroundColor: "#dddddd68" }
              }
            >
              <div className={viewPatientCSS.textAndIconCover}>
                <h1 className={viewPatientCSS.title}>Document Information</h1>
                <div className={viewPatientCSS.iconCoverDivDeleteEdit}>
                  <i
                    onClick={() => {
                      handleUpdateDocumentData();
                    }}
                    class="fa-solid fa-pencil"
                  ></i>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "3rem",
                  flexDirection: "column",
                }}
              >
                {documents.map((obj, key) => (
                  <div key={key} className={viewPatientCSS.fieldCoverDiv}>
                    <label className={viewPatientCSS.fieldLabel}>
                      {obj.document_type}
                      <span className={viewPatientCSS.star}>*</span>
                    </label>

                    <img
                      src={`${import.meta.env.VITE_CLOUDINARY_BASE_URL}${
                        obj.document_url
                      }`}
                      alt={obj.document_type}
                      className={viewPatientCSS.previewImage}
                    />
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};
export default ViewPatient;
