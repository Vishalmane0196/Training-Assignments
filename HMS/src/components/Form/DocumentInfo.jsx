import React, { useContext, useState } from "react";
import DocumentCSS from "../../style/Document.module.css";
import { useForm } from "react-hook-form";
import { MyContext } from "../../utils/ContextApi";
import { toast } from "react-toastify";

export const DocumentInfo = ({ setStep, patientId }) => {
  const [filePreviews, setFilePreviews] = useState(JSON.parse(localStorage.getItem('file_preview')) || {});
  const [fileData, setFileData] = useState({});
  const [uploadStatus, setUploadStatus] = useState(JSON.parse(localStorage.getItem('upload_status'))  || {}); 

  const contextData = useContext(MyContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitDocumentData = () => {
    const formData = new FormData();
    Object.entries(fileData).forEach(([key, value]) => {
      formData.append(key, value);
    });
  };

  const handleBackBtn = () => {
    setStep((prev) => {
      localStorage.setItem("step", prev - 1);
      return prev - 1;
    });
  };

  const handleUploadDocument = async (img) => {
    try {
      const formData = new FormData();
      formData.append("file", fileData[img]);
      formData.append("document_type", img);
      formData.append("patient_id", patientId);
      console.log("iD", patientId);
      let response = await contextData.axiosInstance.post(
        "/patient/upload",
        formData
      );
      console.log("upload", response);
      console.log(response);

      if (response.data.status === 201) {
        setUploadStatus((prev) =>{
          let obj = {
            ...prev,
            [img]: true,
          }
          localStorage.setItem('upload_status',JSON.stringify(obj));
          return obj;
        });
      }
      toast.success('file uploaded successfully')
    } catch (error) {
      console.log(error);
      toast.error('Error uploading file')
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const { name } = event.target;

    setFileData((prev) => ({
      ...prev,
      [name]: file,
    }));

    const fileURL = URL.createObjectURL(file);
    setFilePreviews((prev) =>
      {
        let obj = {
         ...prev,
          [name]: fileURL,
        }
        localStorage.setItem('file_preview',JSON.stringify(obj));
        return obj;
      });

    
  };
  const handleUploadUpdateDocument = async (docType) => {
    try {
      const formData = new FormData();
      formData.append("file", fileData[docType]);
      formData.append("document_type", docType);
      formData.append("patient_id", patientId);

      let response = await contextData.axiosInstance.put(
        "/patient/updateDocument",
        formData
      );
      console.log("update", response);
      toast.success('file Updated successfully')
    } catch (error) {
      console.log(error);
      toast.error('error updating file')
    }
  };

  const handleDeleteFile = async (docType) => {
    console.log("type", docType);
    const formData = new FormData();
    formData.append("document_type", docType);
    formData.append("patient_id", patientId);
    console.log("id", patientId);

    try {
      
      let response = await contextData.axiosInstance.delete(
        "/patient/deleteDocument",
        {
          data: formData,
        }
      );
      console.log(response);
      if (response.data.status === 200) {
        setFileData((prev) => {
          const updatedFiles = { ...prev };
          delete updatedFiles[docType];
          return updatedFiles;
        });
        setFilePreviews((prev) => {
          const updatedPreviews = { ...prev };
          delete updatedPreviews[docType];
          localStorage.setItem('file_preview',JSON.stringify(updatedPreviews));
          return updatedPreviews;
        });

        setUploadStatus((prev) => {
          const updatedStatus = { ...prev };
          delete updatedStatus[docType];
          localStorage.setItem('upload_status',JSON.stringify(updatedStatus));
          return updatedStatus;
        });
      }
      toast.success('file deleted successfully')
    } catch (error) {
      console.log(error);
      toast.error(`error deleting file ${error.response.data.message}`)
    }
  };

  return (
    <>
      <div className={DocumentCSS.container}>
        <h1 className={DocumentCSS.title}>Document Information</h1>
        <form onSubmit={handleSubmit(handleSubmitDocumentData)}>
          <div style={{ display: "flex", gap: "3rem", height: "45vh" }}>
            {["AdharFront", "Adharback", "insurancefront", "insuranceback"].map(
              (docType) => (
                <div key={docType} className={DocumentCSS.fieldcoverdiv}>
                  <label className={DocumentCSS.fieldlabel}>
                    {docType.replace(/([A-Z])/g, " $1")}{" "}
                    <span className={DocumentCSS.star}>*</span>
                  </label>
                  <input
                    className={DocumentCSS.inputfield}
                    {...register(docType, { required: true })}
                    onChange={handleFileChange}
                    type="file"
                    name={docType}
                    // Disable after upload
                  />

                  {filePreviews[docType] && (
                    <div className={DocumentCSS.previewContainer}>
                      <img
                        src={filePreviews[docType]}
                        alt={docType}
                        className={DocumentCSS.previewImage}
                      />

                      <div style={{ display: "flex", alignItems: "center" }}>
                        {uploadStatus[docType] ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleUploadUpdateDocument(docType);
                            }}
                            className={DocumentCSS.uploadbtn}
                            style={
                              uploadStatus[docType]
                                ? {
                                    backgroundColor: "#ddd",
                                    color: "black",
                                  }
                                : {
                                    backgroundColor: "#D9534F",
                                    color: "white",
                                  }
                            }
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleUploadDocument(docType);
                            }}
                            className={DocumentCSS.uploadbtn}
                          >
                            Upload
                          </button>
                        )}

                        <button
                          style={
                            uploadStatus[docType]
                              ? { display: "flex" }
                              : { display: "none" }
                          }
                          onClick={(e) => {
                            e.preventDefault();
                            handleDeleteFile(docType);
                          }}
                          className={DocumentCSS.deletebtn}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}

                  {errors[docType] && (
                    <p className={DocumentCSS.fielderror}>
                      {errors[docType].message}
                    </p>
                  )}
                </div>
              )
            )}
          </div>

          <div className={DocumentCSS.btnstye}>
            <button
              onClick={handleBackBtn}
              className={DocumentCSS.backbtn}
              type="button"
            >
              Back
            </button>

            <button
              onClick={() => {
                setStep((prev) => {
                  localStorage.setItem("step", prev + 1);
                  localStorage.removeItem('patientId');
                  return prev + 1;
                });
              }}
              className={DocumentCSS.submitbtn}
              type="submit"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
