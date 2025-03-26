import React, { useContext, useEffect, useState } from "react";
import ViewPatientCSS from "../../style/ViewPatient.module.css";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";

export const ViewPatient = () => {
  const param = useParams();
  const contextData = useContext(MyContext);
  const [patientData, setPatientdat] = useState();

  const [personalUpdate, setPersonalUpdate] = useState(false);
  const [FamilyUpdate, setFamily] = useState(false);
  const [DiseaseUpdate, setDiseaseUpdate] = useState(false);
  const [DocumentUpdate, setDocumentUpdate] = useState(false);
  const [documents, setDocuments] = useState([]);
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patient_name: patientData?.patient_name || "",
      date_of_birth: patientData?.date_of_birth || "",
      gender: patientData?.gender || "",
      weight: patientData?.weight || "",
      height: patientData?.height || "",
      country_of_origin: patientData?.country_of_origin || "",
      is_diabetic: patientData?.is_diabetic ?? "",
      cardiac_issue: patientData?.cardiac_issue ?? "",
      blood_pressure: patientData?.blood_pressure ?? "",
      bmi: patientData?.bmi || "",
      disease_description: patientData?.disease_description || "",
      disease_type: patientData?.disease_type || "",
      father_age: patientData?.father_age || "",
      father_country_origin: patientData?.father_country_origin || "India",
      father_name: patientData?.father_name || "Mayappa",
      first_name: patientData?.first_name || "Vikrant",
      last_name: patientData?.last_name || "Bhadange",
      mobile_number: patientData?.mobile_number || "1234567890",
      mother_age: patientData?.mother_age || 45,
      mother_country_origin: patientData?.mother_country_origin || "India",
      mother_name: patientData?.mother_name || "Vanita",
      parent_bp: patientData?.parent_bp ?? "",
      parent_cardiac_issue: patientData?.parent_cardiac_issue ?? "",
      parent_diabetic: patientData?.parent_diabetic || "",
      patient_id: patientData?.patient_id || "",
    },
  });
  console.log(errors);
  const [selectedFiles, setSelectedFiles] = useState({});
  const handleFileChange = (e, docType) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedFiles((prev) => ({
      ...prev,
      [docType]: file, // Store file for specific document type
    }));
  };
  const handlePatientData = () => {
    setPersonalUpdate((pre) => !pre);
  };
  const handleFamilyData = () => {
    setFamily((pre) => !pre);
  };
  const handleDiseaseData = () => {
    setDiseaseUpdate((pre) => !pre);
  };
  const handleDocumentData = () => {
    setDocumentUpdate((pre) => !pre);
  };
  //------------------
  const handleUpdatePersonaldata = async (data) => {
    console.log(data);
    try {
      let response = await contextData.axiosInstance.put(
        "/patient/updatePersonalInfo",
        {
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
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        toast.success("Personal Information Updated successfully!");
        setPersonalUpdate(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateFamilyData = async (data) => {
    try {
      let response = await contextData.axiosInstance.put(
        "/patient/updateFamilyInfo",
        {
          patient_id: data.patient_id,
          father_name: data.father_name,
          father_age: data.father_age,
          father_country_origin: data.father_country_origin,
          mother_name: data.mother_name,
          mother_age: data.mother_age,
          mother_country_origin: data.mother_country_origin,
          parent_bp: data.parent_bp == "true" ? 1 : 0,
          parent_cardiac_issue: data.parent_cardiac_issue == "true" ? 1 : 0,
          parent_diabetic: data.parent_diabetic == "true" ? 1 : 0,
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        toast.success("Family Information Updated successfully!");
        setFamily(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateDiseaseData = async (data) => {
    console.log(data);
    try {
      let response = await contextData.axiosInstance.put(
        "/patient/updateDiseaseInfo",
        {
          patient_id: data.patient_id,
          disease_description: data.disease_description,
          disease_type: data.disease_type,
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        toast.success("Disease Information Updated successfully!");
        setDiseaseUpdate(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateDocumentData = async(data) => {
    try {
      console.log("ha mi chaloy",data);
      const formData = new FormData();
      formData.append("file", selectedFiles[data]);
      formData.append("document_type", data);
      formData.append("patient_id",patientData.patient_id );
     
      let response = await contextData.axiosInstance.put(
        "/patient/updateDocument",
        formData
      );
      console.log("update",response);

        
         
           response = await contextData.axiosInstance.get('/patient/getPatientInfo');
          contextData.setAllPatients(response.data.data);
          setDocumentUpdate(false);
        
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let fountPatient = contextData.allPatients.find(
      (obj) => obj.patient_id == param.id
    );
    console.log("found", fountPatient);
    setPatientdat(fountPatient);
    if (fountPatient) {
      reset({
        patient_name: fountPatient?.patient_name || "",
        date_of_birth: fountPatient?.date_of_birth
          ? new Date(fountPatient.date_of_birth).toISOString().split("T")[0]
          : "",
        gender: fountPatient?.gender || "",
        weight: fountPatient?.weight || "",
        height: fountPatient?.height || "",
        country_of_origin: fountPatient?.country_of_origin || "",
        is_diabetic: fountPatient?.is_diabetic == 1 ? "true" : "false",
        cardiac_issue: fountPatient?.cardiac_issue == 1 ? "true" : "false",
        blood_pressure: fountPatient?.blood_pressure == 1 ? "true" : "false",
        age: fountPatient?.age || "",
        bmi: fountPatient?.bmi || "",
        disease_description: fountPatient?.disease_description || "",
        disease_type: fountPatient?.disease_type || "",

        father_age: fountPatient?.father_age || "",
        father_country_origin: fountPatient?.father_country_origin || "India",
        father_name: fountPatient?.father_name || "Mayappa",
        first_name: fountPatient?.first_name || "Vikrant",
        last_name: fountPatient?.last_name || "Bhadange",
        mobile_number: fountPatient?.mobile_number || "1234567890",
        mother_age: fountPatient?.mother_age || 45,
        mother_country_origin: fountPatient?.mother_country_origin || "India",
        mother_name: fountPatient?.mother_name || "Vanita",
        parent_bp: fountPatient?.parent_bp == 1 ? "true" : "false",
        parent_cardiac_issue:
          fountPatient?.parent_cardiac_issue == 1 ? "true" : "false",
        parent_diabetic: fountPatient?.parent_diabetic == 1 ? "true" : "false",
        patient_id: fountPatient?.patient_id || "",
      });
      setDocuments(fountPatient?.documents);
    }
  }, [param.id, reset,contextData.allPatients]);

  return (
    <>
      {console.log("hello object", patientData)}

      <div className={ViewPatientCSS.container}>
        {/* {---------------------------} */}

        <div
          className={ViewPatientCSS.sectioncover}
          style={
            personalUpdate
              ? { backgroundColor: "#84a89a68" }
              : { backgroundColor: "#dddddd68" }
          }
        >
          <div className={ViewPatientCSS.textandiconcover}>
            <h1 className={ViewPatientCSS.title}>Personal Information</h1>
            <div className={ViewPatientCSS.iconcoverdivdeletedit}>
              {personalUpdate ? (
                <i
                  onClick={() => {
                    handleSubmit(handleUpdatePersonaldata)();
                  }}
                  class="fa-solid fa-floppy-disk"
                ></i>
              ) : (
                <i onClick={handlePatientData} class="fa-solid fa-pencil"></i>
              )}
            </div>
          </div>
          <form>
            <div style={{ display: "flex", gap: "3rem" }}>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Patient Name <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={personalUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("patient_name")}
                  onChange={(e) => {
                    setValue("patient_name", e.target.value);
                    trigger("patient_name");
                  }}
                  type="text"
                  placeholder="Enter Full Name..."
                />
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Birth date <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={personalUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("date_of_birth")}
                  type="date"
                />
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Gender <span className={ViewPatientCSS.star}>*</span>
                </label>
                <select
                  disabled={personalUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("gender")}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Weight <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={personalUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("weight")}
                  type="number"
                  placeholder="Enter weight"
                />
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Height <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={personalUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("height")}
                  type="number"
                  placeholder="Enter height"
                />
              </div>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Country <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={personalUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("country_of_origin")}
                  onChange={(e) => {
                    const { onChange } = register("country_of_origin");
                    onChange(e);
                    trigger("country_of_origin");
                  }}
                  type="text"
                  placeholder="Enter country."
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Blood Pressure <span className={ViewPatientCSS.star}>*</span>
                </label>
                <label>
                  <input
                    disabled={personalUpdate ? false : true}
                    {...register("blood_pressure")}
                    type="radio"
                    value="true"
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    {...register("blood_pressure")}
                    type="radio"
                    value="false"
                  />{" "}
                  No
                </label>
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Diabetic <span className={ViewPatientCSS.star}>*</span>
                </label>
                <label>
                  <input
                    disabled={personalUpdate ? false : true}
                    {...register("is_diabetic")}
                    type="radio"
                    value="true"
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    disabled={personalUpdate ? false : true}
                    {...register("is_diabetic")}
                    type="radio"
                    value="false"
                  />{" "}
                  No
                </label>
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Cardiac Issue <span className={ViewPatientCSS.star}>*</span>
                </label>
                <label>
                  <input
                    disabled={personalUpdate ? false : true}
                    {...register("cardiac_issue")}
                    type="radio"
                    value="true"
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    disabled={personalUpdate ? false : true}
                    {...register("cardiac_issue")}
                    type="radio"
                    value="false"
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </form>
        </div>
        {/* ---------------- */}

        <div
          className={ViewPatientCSS.sectioncover}
          style={
            FamilyUpdate
              ? { backgroundColor: "#84a89a68" }
              : { backgroundColor: "#dddddd68" }
          }
        >
          <div className={ViewPatientCSS.textandiconcover}>
            <h1 className={ViewPatientCSS.title}>Family Information</h1>
            <div className={ViewPatientCSS.iconcoverdivdeletedit}>
              {FamilyUpdate ? (
                <i
                  onClick={() => {
                    handleSubmit(handleUpdateFamilyData)();
                  }}
                  class="fa-solid fa-floppy-disk"
                ></i>
              ) : (
                <i onClick={handleFamilyData} class="fa-solid fa-pencil"></i>
              )}
            </div>
          </div>
          <form>
            <div style={{ display: "flex", gap: "3rem" }}>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Father Name <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={FamilyUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("father_name", {
                    required: "Name is required",
                  })}
                  onChange={(e) => {
                    setValue("father_name", e.target.value);
                    trigger("father_name");
                  }}
                  type="text"
                  placeholder="Enter Full Name..."
                />
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Father Country<span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={FamilyUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("father_country_origin", {
                    required: "Country Required",
                  })}
                  onChange={(e) => {
                    setValue("father_country_origin", e.target.value);
                    trigger("father_country_origin");
                  }}
                  type="text"
                />
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Age <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={FamilyUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("father_age", {
                    required: true,
                  })}
                  onChange={(e) => {
                    const { onChange } = register("father_age");
                    onChange(e);
                    trigger("father_age");
                  }}
                  type="number"
                  placeholder="Enter age."
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "3rem", marginTop: "2rem" }}>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Mother Name <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={FamilyUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("mother_name", {
                    required: "mother_name is required",
                  })}
                  type="text"
                  placeholder="Enter mother name"
                  onChange={(e) => {
                    setValue("mother_name", e.target.value);
                    trigger("mother_name");
                  }}
                />
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Mother Country <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={FamilyUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("mother_country_origin", {
                    required: "Country is required",
                  })}
                  type="text"
                  placeholder="Enter mother_country_origin"
                  onChange={(e) => {
                    setValue("mother_country_origin", e.target.value);
                    trigger("mother_country_origin");
                  }}
                />
              </div>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Mother Age <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={FamilyUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("mother_age", {
                    required: "mother_age is required",
                  })}
                  type="number"
                  placeholder="Enter mother_age"
                  onChange={(e) => {
                    setValue("mother_age", e.target.value);
                    trigger("mother_age");
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "3rem", marginTop: "2rem" }}>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Blood Pressure <span className={ViewPatientCSS.star}>*</span>
                </label>
                <label>
                  <input
                    disabled={FamilyUpdate ? false : true}
                    {...register("parent_bp")}
                    type="radio"
                    value="true"
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    disabled={FamilyUpdate ? false : true}
                    {...register("parent_bp")}
                    type="radio"
                    value="false"
                  />{" "}
                  No
                </label>
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Parent Cardiac <span className={ViewPatientCSS.star}>*</span>
                </label>
                <label>
                  <input
                    disabled={FamilyUpdate ? false : true}
                    {...register("parent_cardiac_issue")}
                    type="radio"
                    value="true"
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    disabled={FamilyUpdate ? false : true}
                    {...register("parent_cardiac_issue")}
                    type="radio"
                    value="false"
                  />{" "}
                  No
                </label>
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Parent Diabetic <span className={ViewPatientCSS.star}>*</span>
                </label>
                <label>
                  <input
                    disabled={FamilyUpdate ? false : true}
                    {...register("parent_diabetic")}
                    type="radio"
                    value="true"
                  />{" "}
                  Yes
                </label>
                <label>
                  <input
                    disabled={FamilyUpdate ? false : true}
                    {...register("parent_diabetic")}
                    type="radio"
                    value="false"
                  />{" "}
                  No
                </label>
              </div>
            </div>
          </form>
        </div>
        {/* ---------------- */}
        <div
          className={ViewPatientCSS.sectioncover}
          style={
            DiseaseUpdate
              ? { backgroundColor: "#84a89a68" }
              : { backgroundColor: "#dddddd68" }
          }
        >
          <div className={ViewPatientCSS.textandiconcover}>
            <h1 className={ViewPatientCSS.title}>Disease Information</h1>
            <div className={ViewPatientCSS.iconcoverdivdeletedit}>
              {DiseaseUpdate ? (
                <i
                  onClick={() => {
                    handleSubmit(handleUpdateDiseaseData)();
                  }}
                  class="fa-solid fa-floppy-disk"
                ></i>
              ) : (
                <i onClick={handleDiseaseData} class="fa-solid fa-pencil"></i>
              )}
            </div>
          </div>
          <form>
            <div style={{ display: "flex", gap: "3rem", marginBottom: "2rem" }}>
              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Disease Name <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={DiseaseUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("disease_type")}
                  onChange={(e) => {
                    setValue("disease_type", e.target.value);
                    trigger("disease_type");
                  }}
                  type="text"
                  placeholder="Enter disease_type Name..."
                />
              </div>

              <div className={ViewPatientCSS.fieldcoverdiv}>
                <label className={ViewPatientCSS.fieldlabel}>
                  Disease Description{" "}
                  <span className={ViewPatientCSS.star}>*</span>
                </label>
                <input
                  disabled={DiseaseUpdate ? false : true}
                  className={ViewPatientCSS.inputfield}
                  {...register("disease_description")}
                  type="text"
                  placeholder="Enter disease_description"
                  onChange={(e) => {
                    setValue("disease_description", e.target.value);
                    trigger("disease_description");
                  }}
                />
              </div>
            </div>
          </form>
        </div>

        {/* ---------------- */}

        <div
          className={ViewPatientCSS.sectioncover}
          style={
            DocumentUpdate
              ? { backgroundColor: "#84a89a68" }
              : { backgroundColor: "#dddddd68" }
          }
        >
          <div className={ViewPatientCSS.textandiconcover}>
            <h1 className={ViewPatientCSS.title}>Document Information</h1>
            <div className={ViewPatientCSS.iconcoverdivdeletedit}>
              {DocumentUpdate ? (
                <i
                  onClick={handleDocumentData}
                  class="fa-solid fa-floppy-disk"
                ></i>
              ) : (
                <i onClick={handleDocumentData} class="fa-solid fa-pencil"></i>
              )}
            </div>
          </div>
          
            <div
              style={{ display: "flex", gap: "3rem", flexDirection: "column" }}
            >
              {documents.map((obj, key) => (
                <div key={key} className={ViewPatientCSS.fieldcoverdiv}>
                  <label className={ViewPatientCSS.fieldlabel}>
                    {obj.document_type}
                    <span className={ViewPatientCSS.star}>*</span>
                  </label>
                  <input
                    disabled={DocumentUpdate ? false : true}
                    className={ViewPatientCSS.inputfield}
                    {...register(obj.document_type)}
                    type="file"
                    onChange={(e) => handleFileChange(e, obj.document_type)}
                  />
                  <button
                    disabled={!selectedFiles[obj.document_type]}
                    onClick={() => {
                      handleUpdateDocumentData(obj.document_type);
                    }}
                    className={ViewPatientCSS.uploadbtn}
                  >
                    {" "}
                    Update{" "}
                  </button>
                  <img
                    src={obj.document_url}
                    alt={obj.document_type}
                    className={ViewPatientCSS.previewImage}
                  />
                </div>
              ))}
            </div>
          
        </div>
      </div>
    </>
  );
};
