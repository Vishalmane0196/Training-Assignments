import React, { useContext, useState } from 'react';
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
    formState: { errors },
  } = useForm({
    defaultValues: {
      father_name: FamilyData?.father_name || '',
      father_country_origin: FamilyData?.father_country_origin || '',
      father_age: FamilyData?.father_age || '',
      mother_name: FamilyData?.mother_name || '',
      mother_country_origin: FamilyData?.mother_country_origin || '',
      mother_age: FamilyData?.mother_age || '',
      parent_diabetic: FamilyData?.parent_diabetic ?? '',
      parent_cardiac_issue: FamilyData?.parent_cardiac_issue ?? '',
      parent_bp: FamilyData?.parent_bp ?? '',
      patient_id : patientId 
    },
  });

  const handleSendFamilyInfoServer = async(data) => {
    const formattedData = {
      ...data,
      parent_diabetic: data.parent_diabetic === 'true',
      parent_cardiac_issue: data.parent_cardiac_issue === 'true',
      parent_bp: data.parent_bp === 'true',
      father_age: parseInt(data.father_age, 10),
    mother_age: parseInt(data.mother_age, 10),
    

    };

 try {
      let response;
      if(FamilyData)
      {
         response = await contextdata.axiosInstance.post('/patient/updatePersonalInfo', formattedData);
         if(response.data.status === 201)
         {
           toast.success('Family Information updated successfully!');
         }
      
      }else
      {
         response = await contextdata.axiosInstance.post('/patient/addFamilyInfo',{
'familyDetails':formattedData
         } );
         console.log(response)
         if(response.data.status === 200)
          {
            toast.success('Family Information Added successfully!');
            
          }
      }
      setStep((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleSubmitPersonalData = (data) => {
    console.log(data);
    handleSendFamilyInfoServer(data);
  };

  const handleBackBtn = () => {
    setStep((prev) => prev - 1);
  };

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
              {errors.father_name && <p className={FamilyCSS.fielderror}>{errors.father_name.message}</p>}
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
              {errors.father_country_origin && (
                <p className={FamilyCSS.fielderror}>{errors.father_country_origin.message}</p>
              )}
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
              {errors.father_age && <p className={FamilyCSS.fielderror}>{errors.father_age.message}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '2rem' }}>
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
              {errors.mother_name && <p className={FamilyCSS.fielderror}>{errors.mother_name.message}</p>}
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
              {errors.mother_country_origin && (
                <p className={FamilyCSS.fielderror}>{errors.mother_country_origin.message}</p>
              )}
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
              {errors.mother_age && <p className={FamilyCSS.fielderror}>{errors.mother_age.message}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '2rem' }}>
            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Parent Diabetic <span className={FamilyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input {...register('parent_diabetic', { required: true })} type="radio" value="true" />
              </div>
              <div>
                <label>No</label>
                <input {...register('parent_diabetic', { required: true })} type="radio" value="false" />
              </div>
              {errors.parent_diabetic && <p className={FamilyCSS.fielderror}>{errors.parent_diabetic.message}</p>}
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Parent Cardiac Issue <span className={FamilyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input {...register('parent_cardiac_issue', { required: true })} type="radio" value="true" />
              </div>
              <div>
                <label>No</label>
                <input {...register('parent_cardiac_issue', { required: true })} type="radio" value="false" />
              </div>
              {errors.parent_cardiac_issue && (
                <p className={FamilyCSS.fielderror}>{errors.parent_cardiac_issue.message}</p>
              )}
            </div>

            <div className={FamilyCSS.fieldcoverdiv}>
              <label className={FamilyCSS.fieldlabel}>
                Parent Blood Pressure <span className={FamilyCSS.star}>*</span>
              </label>
              <div>
                <label>Yes</label>
                <input {...register('parent_bp', { required: true })} type="radio" value="true" />
              </div>
              <div>
                <label>No</label>
                <input {...register('parent_bp', { required: true })} type="radio" value="false" />
              </div>
              {errors.parent_bp && <p className={FamilyCSS.fielderror}>{errors.parent_bp.message}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: '1rem', justifyContent: 'right' }}>
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
