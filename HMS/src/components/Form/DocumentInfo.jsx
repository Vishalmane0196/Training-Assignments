// import React, { useContext, useState } from 'react'


// import DocumentCSS from '../../style/Document.module.css'
// import { useForm} from 'react-hook-form';
// import { MyContext } from '../../utils/ContextApi';
// export const DocumentInfo = ({setStep,patientId}) => {
//   const[updateState, setUpdateState] = useState(false);
//   const [filePreviews, setFilePreviews] = useState({}); 
//   const [fileData, setFileData] = useState({});
//   const contextData = useContext(MyContext);
//    const {
//       register,
//       handleSubmit,
//       formState: { errors },
//     } = useForm();
   
//     const handleSubmitDocumentData = () => {
//         const formData = new FormData();
//         Object.entries(fileData).forEach(([key, value]) => {
//           formData.append(key, value);
//         });
    
//     };
//     const handleBackBtn = () =>{
//       setStep(pre=>{
//         return pre -1
//        })
//     }
//     const handleUploadDocument = async(img) =>{
//         try {
//             const formData = new FormData();
            
//             formData.append('file',fileData[img]);
//             formData.append('document_type',img)
//             formData.append('patient_id',patientId);
//             let response = await contextData.axiosInstance('/patient/upload',formData)
//             console.log(response);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (!file) return;
//         setFileData((prev) => ({
//           ...prev,
//           [event.target.name]: file, 
//         }));

//         const fileURL = URL.createObjectURL(file);
//       setFilePreviews((prev) => ({
//         ...prev,
//         [event.target.name]: fileURL, 
//       }));
//       };
//   return (
//     <>
   
//      <div className={DocumentCSS.container} >
//     <h1 className={DocumentCSS.title} >Document Information</h1>
//     <form  onSubmit={handleSubmit(handleSubmitDocumentData)}>
      
//      <div style={{display:"flex",gap:"3rem"}}>
//      <div className={DocumentCSS.fieldcoverdiv}>
//      <label className={DocumentCSS.fieldlabel}>Adhar Card Front <span className={DocumentCSS.star}>*</span></label>
//       <input
//                className={DocumentCSS.inputfield}
//                 {...register("AdharFront", {
//                   required: true,
//                 })}
//                 onChange={(e) => {
//                     handleFileChange(e)
//                 }}
//                 required 
//                 type="file"
             
//               />
//               {filePreviews.AdharFront && (
//                 <img src={filePreviews.AdharFront} alt="Adhar front" className={DocumentCSS.previewImage} />
//               )}

//               <button onClick={handleUploadDocument('AdharFront')} className={DocumentCSS.uploadbtn}>Upload</button>
//               { 
//                 errors.AdharFront && <p className={DocumentCSS.fielderror}>{errors.AdharFront.message}</p>
//               }
//      </div>
//      <div className={DocumentCSS.fieldcoverdiv}>
//      <label className={DocumentCSS.fieldlabel}>Adhar Card Back <span className={DocumentCSS.star}>*</span></label>
//       <input
//                className={DocumentCSS.inputfield}
//                 {...register("Adharback", {
//                   required: true,
                  
                 
//                 })}
//                 onChange={(e) => {
//                 handleFileChange(e);
//                 }}
//                 type="file"
              
//               />
//                {filePreviews.Adharback && (
//                 <img src={filePreviews.Adharback} alt="Adhar Back" className={DocumentCSS.previewImage} />
//               )}
//               { 
//                 errors.Adharback && <p className={DocumentCSS.fielderror}>{errors.Adharback.message}</p>
//               }
//      </div>
//      <div className={DocumentCSS.fieldcoverdiv}>
//      <label className={DocumentCSS.fieldlabel}>Medical Insurance Front <span className={DocumentCSS.star}>*</span></label>
//       <input
//                className={DocumentCSS.inputfield}
//                 {...register("insurancefront", {
//                   required: true,
                  
//                 })}
//                 onChange={(e) => {
//                  handleFileChange(e)
//                 }}
//                 type="file"
               
//               />
//                {filePreviews.insurancefront && (
//                 <img src={filePreviews.insurancefront} alt="Adhar Back" className={DocumentCSS.previewImage} />
//               )}
//               { 
//                 errors.insurancefront && <p className={DocumentCSS.fielderror}>{errors.insurancefront.message}</p>
//               }
//      </div>
//      <div className={DocumentCSS.fieldcoverdiv}>
//      <label className={DocumentCSS.fieldlabel}>Medical Insurance Back <span className={DocumentCSS.star}>*</span></label>
//       <input
//                className={DocumentCSS.inputfield}
//                 {...register("insuranceback", {
//                   required: true,
//                 })}
//                 onChange={(e) => {
//                 handleFileChange(e);
//                 }}
//                 required 
//                 type="file"
                
//               />
//                {filePreviews.insuranceback && (
//                 <img src={filePreviews.insuranceback} alt="Adhar Back" className={DocumentCSS.previewImage} />
//               )}
//               { 
//                 errors.insuranceback && <p className={DocumentCSS.fielderror}>{errors.insuranceback.message}</p>
//               }
//      </div>
     

//      </div>
  
//     <div className={DocumentCSS.btnstye} >
//     <button onClick={handleBackBtn} className={DocumentCSS.backbtn} type="button"> Back</button>
//       {
//         updateState ? 
// <button className={DocumentCSS.Update} type="submit">Update</button> :
//   <button  className={DocumentCSS.submitbtn} type="submit"> Next</button>
//       }
   
     
//      </div>
//     </form>
//   </div>
   
//     </>
//   )
// }
import React, { useContext, useState } from 'react';
import DocumentCSS from '../../style/Document.module.css';
import { useForm } from 'react-hook-form';
import { MyContext } from '../../utils/ContextApi';

export const DocumentInfo = ({ setStep, patientId }) => {
  const [updateState, setUpdateState] = useState(false);
  const [filePreviews, setFilePreviews] = useState({});
  const [fileData, setFileData] = useState({});
  const [uploadStatus, setUploadStatus] = useState({}); // Track uploaded files
  const [disabledInputs, setDisabledInputs] = useState({}); // Track disabled inputs
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
    setStep((prev) => prev - 1);
  };

  const handleUploadDocument = async (img) => {
    try {
      const formData = new FormData();
      formData.append('file', fileData[img]);
      formData.append('document_type', img);
      formData.append('patient_id', patientId);

      let response = await contextData.axiosInstance.post('/patient/upload', formData);
      console.log(response);

      if (response.data.status === 201) {
        setUploadStatus((prev) => ({
          ...prev,
          [img]: true, // Mark as uploaded
        }));

        setDisabledInputs((prev) => ({
          ...prev,
          [img]: true, // Disable input field after upload
        }));
      }
    } catch (error) {
      console.log(error);
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
    setFilePreviews((prev) => ({
      ...prev,
      [name]: fileURL,
    }));

    setUploadStatus((prev) => ({
      ...prev,
      [name]: false, // Reset upload status when a new file is selected
    }));

    setDisabledInputs((prev) => ({
      ...prev,
      [name]: false, 
    }));
  };

  const handleDeleteFile = async(docType) => {
    const formdata =  new FormData();
    formdata.append('document_type', docType);
    formdata.append('patient_id', patientId);
    try {
        let response = await contextData.axiosInstance.delete('/patient/deleteDocument',formdata);
        console.log(response);
        // if(response.data.status === 200)
        // {
        //     setFileData((prev) => {
        //         const updatedFiles = { ...prev };
        //         delete updatedFiles[docType];
        //         return updatedFiles;
        //       });
        //       setFilePreviews((prev) => {
        //         const updatedPreviews = { ...prev };
        //         delete updatedPreviews[docType];
        //         return updatedPreviews;
        //       });
          
        //       setUploadStatus((prev) => {
        //         const updatedStatus = { ...prev };
        //         delete updatedStatus[docType];
        //         return updatedStatus;
        //       });
        //       setDisabledInputs((prev) => ({
        //         ...prev,
        //         [docType]: false, 
        //       }));
        // }
       
    } catch (error) {
        console.log(error);
    }
    
  };

  return (
    <>
      <div className={DocumentCSS.container}>
        <h1 className={DocumentCSS.title}>Document Information</h1>
        <form onSubmit={handleSubmit(handleSubmitDocumentData)}>
          <div style={{ display: 'flex', gap: '3rem', height: '45vh' }}>
            {['AdharFront', 'Adharback', 'insurancefront', 'insuranceback'].map((docType) => (
              <div key={docType} className={DocumentCSS.fieldcoverdiv}>
                <label className={DocumentCSS.fieldlabel}>
                  {docType.replace(/([A-Z])/g, ' $1')} <span className={DocumentCSS.star}>*</span>
                </label>
                <input
                  className={DocumentCSS.inputfield}
                  {...register(docType, { required: true })}
                  onChange={handleFileChange}
                  type="file"
                  disabled={disabledInputs[docType]} // Disable after upload
                />

                {filePreviews[docType] && (
                  <div className={DocumentCSS.previewContainer}>
                    <img src={filePreviews[docType]} alt={docType} className={DocumentCSS.previewImage} />
                    
                    {/* Upload Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleUploadDocument(docType);
                      }}
                      className={DocumentCSS.uploadbtn}
                      disabled={uploadStatus[docType]} // Disable button after upload
                      style={uploadStatus[docType] ? { backgroundColor: 'lightgreen', cursor: 'not-allowed' } : {}}
                    >
                      {uploadStatus[docType] ? 'Uploaded' : 'Upload'}
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteFile(docType);
                      }}
                      className={DocumentCSS.deletebtn}
                    >
                      Delete
                    </button>
                  </div>
                )}

                {errors[docType] && <p className={DocumentCSS.fielderror}>{errors[docType].message}</p>}
              </div>
            ))}
          </div>

          <div className={DocumentCSS.btnstye}>
            <button onClick={handleBackBtn} className={DocumentCSS.backbtn} type="button">
              Back
            </button>
            {updateState ? (
              <button className={DocumentCSS.Update} type="submit">
                Update
              </button>
            ) : (
              <button className={DocumentCSS.submitbtn} type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
