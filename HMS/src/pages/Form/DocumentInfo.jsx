import React, { useState } from "react";
import documentCSS from "../../style/Document.module.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
    const formData = new FormData();

    formData.append("file", file);
    formData.append("document_type", img);
    formData.append("patient_id", patientId);

    let documentUpdate = dispatch(addDocument(formData)).unwrap();

    toast.promise(documentUpdate, {
      pending: "Uploading Document...",
      success: "Uploaded successfully.",
      error: "Failed to upload the document.",
    });
    try {
      await documentUpdate;
      setUploadStatus((prev) => {
        let obj = {
          ...prev,
          [img]: true,
        };
        localStorage.setItem("upload_status", JSON.stringify(obj));
        return obj;
      });
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
        [name]: btoa(fileURL),
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

  return (
    <>
      <div className={documentCSS.container}>
        <form>
          <div style={{ display: "flex", gap: "3rem", height: "45vh" }}>
            {[
              "Aadhaar Front",
              "Aadhaar Back",
              "Insurance Front",
              "Insurance Back",
            ].map((docType) => (
              <div key={docType} className={documentCSS.fieldCoverDiv}>
                <label className={documentCSS.fieldLabel}>
                  {docType.replace(/([A-Z])/g, " $1")}{" "}
                </label>
                <input
                  className={documentCSS.inputfield}
                  {...register(docType, { required: true })}
                  onChange={handleFileChange}
                  type="file"
                  name={docType}
                  accept=".jpg, .jpeg, .png"
                />

                {filePreviews[docType] && (
                  <div className={documentCSS.previewContainer}>
                    <img
                      src={atob(filePreviews[docType])}
                      alt={docType}
                      className={documentCSS.previewImage}
                    />
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
