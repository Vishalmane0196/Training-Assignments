import React, { useContext, useEffect, useState } from 'react';
import FamilyCSS from '../../style/Family.module.css';
import { useForm } from 'react-hook-form';
import { MyContext } from '../../utils/ContextApi';
import { toast } from 'react-toastify';

export const FamilyInfo = ({ setStep,patientId }) => {
  const [FamilyData, setFamilyData] = useState(null);
  const contextdata = useContext(MyContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      father_name: FamilyData?.father_name || '',
      father_country_origin: FamilyData?.father_country_origin || '',
      father_age: FamilyData?.father_age || '',
      mother_name: FamilyData?.mother_name || '',
      mother_country_origin: FamilyData?.mother_country_origin || '',
      mother_age: FamilyData?.mother_age || '',
      parent_diabetic: FamilyData?.parent_diabetic || '',
      parent_cardiac_issue: FamilyData?.parent_cardiac_issue || '',
      parent_bp: FamilyData?.parent_bp || '',
      patient_id : patientId 
    },
  });

  const handleSendFamilyInfoServer = async(data) => {
    const formattedData = {
      ...data,
      parent_diabetic: data.parent_diabetic === 'true' ? 1 : 0,
      parent_cardiac_issue: data.parent_cardiac_issue === 'true' ? 1:0,
      parent_bp: data.parent_bp === 'true' ? 1:0,
      father_age: parseInt(data.father_age, 10),
    mother_age: parseInt(data.mother_age, 10),
    patient_id : patientId
  
    
    };

 try {
      let response;
      if(FamilyData)
      {
         response = await contextdata.axiosInstance.put('/patient/updateFamilyInfo', formattedData);
         
           toast.success('Family Information updated successfully!');
         
      
      }else
      {
        let data2 = {
          ...data,
          parent_bp : data.parent_bp == 1 ? true : false,

parent_cardiac_issue : data.parent_cardiac_issue == 1 ? true : false,

parent_diabetic : data.parent_diabetic == 1 ? true : false,
patient_id : patientId
        }
         response = await contextdata.axiosInstance.post('/patient/addFamilyInfo',{
'familyDetails':data2
         } );
         console.log(response)
         
            toast.success('Family Information Added successfully!');
          
      }
      setStep((prev) =>{
        localStorage.setItem("step", prev+1);
        return prev+1;
      });
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleSubmitPersonalData = (data) => {
    console.log(data);
    handleSendFamilyInfoServer(data);
  };

  const handleBackBtn = () => {
    setStep((prev) =>{
      localStorage.setItem("step", prev-1);
      return prev-1;
    });
  };
  useEffect(()=>{
      const getFamilyInfo = async () =>{
          if(patientId === null)
          {
            return;

          }
          else
          {
            try {
              let response =  await contextdata.axiosInstance.get(`/patient/getFamilyInfo/${patientId}`)
              if (response.data.data[0]) {
                setFamilyData(response.data.data[0]);
              }
              reset({

                father_name: response.data.data[0]?.father_name || '',
                father_country_origin: response.data.data[0]?.father_country_origin || '',
                father_age: response.data.data[0]?.father_age || '',
                mother_name: response.data.data[0]?.mother_name || '',
                mother_country_origin: response.data.data[0]?.mother_country_origin || '',
                mother_age: response.data.data[0]?.mother_age || '',
                parent_diabetic: response.data.data[0]?.parent_diabetic == 1 ? 'true' : 'false',
                parent_cardiac_issue: response.data.data[0]?.parent_cardiac_issue == 1 ? 'true' : 'false',
                parent_bp: response.data.data[0]?.parent_bp == 1 ? 'true' : 'false',
              })
            } catch (error) {
              console.log(error);
            }
          }
      }
      getFamilyInfo();
  },[])

  return (
    <>
      <div className={FamilyCSS.container}>
        <h1 className={FamilyCSS.title}>Family Information</h1>
        <form onSubmit={handleSubmit(handleSubmitPersonalData)}>
          <div style={{ display: 'flex', gap: '3rem' }}>
            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Father Name <span className={FamilyCSS.star}>*</span>
              </label>
              <input
                className={FamilyCSS.inputfield}
                {...register('father_name', { required: 'Father name is required' })}
                type="text"
                placeholder="Enter Full Name..."
              />
              <p className={FamilyCSS.fielderror}>
                {
                  errors.father_name && (
                    <span >{errors.father_name.message}</span>
                  )
                }
              </p>
            
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Father Country <span className={FamilyCSS.star}>*</span>
              </label>
              <input
                className={FamilyCSS.inputfield}
                {...register('father_country_origin', { required: 'Country is required' })}
                type="text"
                placeholder="Enter Country"
              />
             <p className={FamilyCSS.fielderror}> 
              {
                errors.father_country_origin && (
                    <span >{errors.father_country_origin.message}</span>
                  )
  
              }
             </p>
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Father Age <span className={FamilyCSS.star}>*</span>
              </label>
              <input
                className={FamilyCSS.inputfield}
                {...register('father_age', { required: 'Age is required' })}
                type="number"
                placeholder="Enter Age."
              />
             <p className={FamilyCSS.fielderror}>
              {
                errors.father_age && (
                    <span >{errors.father_age.message}</span>
                  )
              }
             </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Mother Name <span className={FamilyCSS.star}>*</span>
              </label>
              <input
                className={FamilyCSS.inputfield}
                {...register('mother_name', { required: 'Mother name is required' })}
                type="text"
                placeholder="Enter Full Name"
              />
              <p className={FamilyCSS.fielderror}>
                {
                  errors.mother_name && (
                    <span >{errors.mother_name.message}</span>
                  )
                }
              </p>
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Mother Country <span className={FamilyCSS.star}>*</span>
              </label>
              <input
                className={FamilyCSS.inputfield}
                {...register('mother_country_origin', { required: 'Country is required' })}
                type="text"
                placeholder="Enter Country"
              />
              <p className={FamilyCSS.fielderror}>
                {
                  errors.mother_country_origin && (
                    <span >{errors.mother_country_origin.message}</span>
                  )
                }
              </p>
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Mother Age <span className={FamilyCSS.star}>*</span>
              </label>
              <input
                className={FamilyCSS.inputfield}
                {...register('mother_age', { required: 'Age is required' })}
                type="number"
                placeholder="Enter Age"
              />
              <p className={FamilyCSS.fielderror}>
                {
                  errors.mother_age && (
                    <span >{errors.mother_age.message}</span>
                  )
                }
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '1rem' }}>
            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Parent Diabetic <span className={FamilyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input {...register('parent_diabetic', { required: 'parent_diabetic is required' })} type="radio" value="true" />
              </div>
              <div>
                <label>No</label>
                <input {...register('parent_diabetic', { required: 'parent_diabetic is required' })} type="radio" value="false" />
              </div>
             <p className={FamilyCSS.fielderror}>
              {
                errors.parent_diabetic && (
                  <span>{errors.parent_diabetic.message}</span>
                )
              }
             </p>
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Parent Cardiac Issue <span className={FamilyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input {...register('parent_cardiac_issue', { required: 'cardiac_issue is  required' })} type="radio" value="true" />
              </div>
              <div>
                <label>No</label>
                <input {...register('parent_cardiac_issue', { required: 'cardiac_issue is  required' })} type="radio" value="false" />
              </div>
              <p className={FamilyCSS.fielderror}>
                {
                  errors.parent_cardiac_issue && (
                    <span >{errors.parent_cardiac_issue.message}</span>
                  )
                }
              </p>
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Parent Blood Pressure <span className={FamilyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input {...register('parent_bp', { required: 'parent_bp is required' })} type="radio" value="true" />
              </div>
              <div>
                <label>No</label>
                <input {...register('parent_bp', { required: 'parent_bp is required' })} type="radio" value="false" />
              </div>
              <p className={FamilyCSS.fielderror}>
                {
                  errors.parent_bp && (
                    <span >{errors.parent_bp.message}</span>
                  )
                }
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'right',marginTop:"0.5rem" }}>
            <button onClick={handleBackBtn} className={FamilyCSS.backbtn} type="button">
              Back
            </button>
            {FamilyData ? (
              <button className={FamilyCSS.submitbtn} type="submit">
                Update
              </button>
            ) : (
              <button className={FamilyCSS.submitbtn} type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
