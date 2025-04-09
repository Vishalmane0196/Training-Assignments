import React, { useEffect, useState } from "react";
import viewPatientCSS from "../../style/ViewPatient.module.css";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRef } from "react";
import { Input } from "src/components/Input/Input";
import { Radio } from "src/components/Radio/Radio";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axiosInstance from "../../api/axios";
import {
  updateDiseaseInfo,
  updatePersonalInfo,
  updateFamilyInfo,
} from "../../redux/asyncThunkFuntions/user";

const ViewPatient = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { patientList } = useSelector((state) => state.patient);
  const param = useParams();

  const inputfield = useRef();

  const [patientData, setPatientData] = useState();
  const [personalUpdate, setPersonalUpdate] = useState(true);
  const [FamilyUpdate, setFamily] = useState(true);
  const [DiseaseUpdate, setDiseaseUpdate] = useState(true);
  const [DocumentUpdate, setDocumentUpdate] = useState(true);
  const [documents, setDocuments] = useState([]);

  const {
    register,
    handleSubmit,
    trigger,
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

  const [selectedFiles, setSelectedFiles] = useState({});
  const handleFileChange = (e, docType) => {
    const file = e.target.files[0];
    setSelectedFiles((prev) => ({
      ...prev,
      [docType]: file,
    }));
  };

  //------------------
  const handleUpdatePersonalData = async (data) => {
    try {
      let obj = {
        patient_id: data.patient_id,
        patient_name: data.patient_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        weight: data.weight,
        height: data.height,
        country_of_origin: data.country_of_origin,
        is_diabetic: data.is_diabetic == "true" ? 1 : 0,
        cardiac_issue: data.cardiac_issue == "true" ? 1 : 0,
        blood_pressure: data.blood_pressure == "true" ? 1 : 0,
      };
      await dispatch(updatePersonalInfo(obj)).unwrap();

      toast.success("Personal Information Updated successfully!");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };
  const handleUpdateFamilyData = async (data) => {
    try {
      let obj = {
        patient_id: data.patient_id,
        father_name: data.father_name,
        father_age: data.father_age,
        father_country_origin: data.father_country_origin,
        mother_name: data.mother_name,
        mother_age: data.mother_age,
        mother_country_origin: data.mother_country_origin,
        mother_diabetic: data.mother_diabetic === "true" ? 1 : 0,
        mother_cardiac_issue: data.mother_cardiac_issue === "true" ? 1 : 0,
        mother_bp: data.mother_bp === "true" ? 1 : 0,
        father_diabetic: data.father_diabetic === "true" ? 1 : 0,
        father_cardiac_issue: data.father_cardiac_issue === "true" ? 1 : 0,
        father_bp: data.father_bp === "true" ? 1 : 0,
      };
      await dispatch(updateFamilyInfo(obj)).unwrap();
      toast.success("Family Information Updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDiseaseData = async (data) => {
    let obj = {
      patient_id: data.patient_id,
      disease_description: data.disease_description,
      disease_type: data.disease_type,
    };
    try {
      await dispatch(updateDiseaseInfo(obj)).unwrap();

      toast.success("Disease Information Updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateDocumentData = async (data) => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFiles[data]);
      formData.append("document_type", data);
      formData.append("patient_id", patientData.patient_id);

      await axiosInstance.put("/patient/updateDocument", formData);
      setSelectedFiles({});
      inputfield.current.file[0] = null;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let id = param.id;
    if (patientList.length == 0) {
      navigate("/user/dashboard/viewpatients");
    }
    console.log(patientList);
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
  }, [param.id, reset]);

  return (
    <>
      <div className={viewPatientCSS.container}>
        {/* {---------------------------} */}

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
                  {personalUpdate ? (
                    <i
                      title="save changes"
                      onClick={() => {
                        handleSubmit(handleUpdatePersonalData)();
                      }}
                      class="fa-solid fa-floppy-disk"
                    ></i>
                  ) : (
                    <i title="edit" class="fa-solid fa-pencil"></i>
                  )}
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
                    <select
                      disabled={personalUpdate ? false : true}
                      className={viewPatientCSS.inputfield}
                      {...register("gender")}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "1rem",
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
                  {FamilyUpdate ? (
                    <i
                      onClick={() => {
                        handleSubmit(handleUpdateFamilyData)();
                      }}
                      class="fa-solid fa-floppy-disk"
                    ></i>
                  ) : (
                    <i class="fa-solid fa-pencil"></i>
                  )}
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
                  {DiseaseUpdate ? (
                    <i
                      onClick={() => {
                        handleSubmit(handleUpdateDiseaseData)();
                      }}
                      class="fa-solid fa-floppy-disk"
                    ></i>
                  ) : (
                    <i class="fa-solid fa-pencil"></i>
                  )}
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
        {/* ---------------- */}

        {/* ---------------- */}

        {/* ---------------- */}
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
                  {DocumentUpdate ? (
                    <i class="fa-solid fa-floppy-disk"></i>
                  ) : (
                    <i class="fa-solid fa-pencil"></i>
                  )}
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
                    <input
                      ref={inputfield}
                      disabled={DocumentUpdate ? false : true}
                      className={viewPatientCSS.inputfield}
                      type="file"
                      name={obj.document_type}
                      onChange={(e) => handleFileChange(e, obj.document_type)}
                    />
                    <button
                      disabled={!selectedFiles[obj.document_type]}
                      onClick={() => {
                        handleUpdateDocumentData(obj.document_type);
                      }}
                      className={viewPatientCSS.uploadBtn}
                    >
                      {" "}
                      Update{" "}
                    </button>
                    <img
                      src={obj.document_url}
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
