import React, { useState } from "react";
import documentCSS from "../../style/Document.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addDocument } from "../../redux/asyncThunkFuntions/user";
import { updateDocument } from "../../redux/asyncThunkFuntions/user";
export const DocumentInfo = ({ setStep, patientId }) => {
  const dispatch = useDispatch();
  const [filePreviews, setFilePreviews] = useState(
    JSON.parse(localStorage.getItem("file_preview")) || {}
  );
  const [fileData, setFileData] = useState({});
  const [uploadStatus, setUploadStatus] = useState(
    JSON.parse(localStorage.getItem("upload_status")) || {}
  );

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleBackBtn = () => {
    dispatch(setStep(2));
  };

  const handleUploadDocument = async (img, file) => {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("document_type", img);
      formData.append("patient_id", patientId);

      await dispatch(addDocument(formData)).unwrap();
      setUploadStatus((prev) => {
        let obj = {
          ...prev,
          [img]: true,
        };
        localStorage.setItem("upload_status", JSON.stringify(obj));
        return obj;
      });

      toast.success("file uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error uploading file");
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
    setFilePreviews((prev) => {
      let obj = {
        ...prev,
        [name]: fileURL,
      };
      localStorage.setItem("file_preview", JSON.stringify(obj));
      return obj;
    });

    if (uploadStatus[name]) {
      handleUploadUpdateDocument(name, file);
    } else {
      handleUploadDocument(name, file);
    }
  };

  const handleUploadUpdateDocument = async (docType, file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("document_type", docType);
    formData.append("patient_id", patientId);

    let documentUpdate = dispatch(updateDocument(formData)).unwrap();

    toast.promise(documentUpdate, {
      pending: "Uploading Document...",
      success: "Uploaded successfully.",
      error: "Failed to upload the document.",
    });
    try {
      await documentUpdate;
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFile = async (docType) => {
    const formData = new FormData();
    formData.append("document_type", docType);
    formData.append("patient_id", patientId);

    try {
      let response = await axiosInstance.delete("/patient/deleteDocument", {
        data: formData,
      });

      if (response.status === 200) {
        setFileData((prev) => {
          const updatedFiles = { ...prev };
          delete updatedFiles[docType];
          return updatedFiles;
        });
        setFilePreviews((prev) => {
          const updatedPreviews = { ...prev };
          delete updatedPreviews[docType];
          localStorage.setItem("file_preview", JSON.stringify(updatedPreviews));

          return updatedPreviews;
        });

        setUploadStatus((prev) => {
          const updatedStatus = { ...prev };
          delete updatedStatus[docType];
          localStorage.setItem("upload_status", JSON.stringify(updatedStatus));

          return updatedStatus;
        });
      }
      toast.success("file deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(`error deleting file ${error.response.data.message}`);
    }
  };

  return (
    <>
      <div className={documentCSS.container}>
        <form>
          <div style={{ display: "flex", gap: "3rem", height: "45vh" }}>
            {[
              "Adhar Front",
              "Adhar Back",
              "Insurance Front",
              "Insurance Back",
            ].map((docType) => (
              <div key={docType} className={documentCSS.fieldCoverDiv}>
                <label className={documentCSS.fieldLabel}>
                  {docType.replace(/([A-Z])/g, " $1")}{" "}
                  <span className={documentCSS.star}>*</span>
                </label>
                <input
                  className={documentCSS.inputfield}
                  {...register(docType, { required: true })}
                  onChange={handleFileChange}
                  type="file"
                  name={docType}
                  accept=".jpg, .jpeg, .png"
                  // Disable after upload
                />

                {filePreviews[docType] && (
                  <div className={documentCSS.previewContainer}>
                    <img
                      src={filePreviews[docType]}
                      alt={docType}
                      className={documentCSS.previewImage}
                    />

                    <div style={{ display: "flex", alignItems: "center" }}>
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
                        className={documentCSS.deleteBtn}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}

                {errors[docType] && (
                  <p className={documentCSS.fielderror}>
                    {errors[docType].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className={documentCSS.btnStyle}>
            <button
              onClick={handleBackBtn}
              className={documentCSS.backBtn}
              type="button"
            >
              Back
            </button>

            <button
              onClick={() => {
                dispatch(setStep(4));
              }}
              className={documentCSS.submitBtn}
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

DocumentInfo.prototype = {
  setStep: PropTypes.func,
  patientId: PropTypes.any,
};
