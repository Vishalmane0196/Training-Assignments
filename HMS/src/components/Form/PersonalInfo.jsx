import React, { useContext, useState } from 'react';
import PersonalCSS from '../../style/Personal.module.css';
import { useForm } from 'react-hook-form';
import { MyContext } from '../../utils/ContextApi';
import { toast } from 'react-toastify';

export const PersonalInfo = ({ setStep,setPatientId }) => {
  const contextdata = useContext(MyContext);
  const [PersonalData, setPersonalData] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patient_name: PersonalData?.patient_name || '',
      date_of_birth: PersonalData?.date_of_birth || '',
      gender: PersonalData?.gender || '',
      weight: PersonalData?.weight || '',
      height: PersonalData?.height || '',
      country_of_origin: PersonalData?.country_of_origin || '',
      is_diabetic: PersonalData?.is_diabetic ?? '',
      cardiac_issue: PersonalData?.cardiac_issue ?? '',
      blood_pressure: PersonalData?.blood_pressure ?? '',
      
    },
  });

  const handleSendPersonalInfoServer = async (data) => {
    const formattedData = {
      ...data,
      blood_pressure: data.blood_pressure === 'true',
      is_diabetic: data.is_diabetic === 'true',
      cardiac_issue: data.cardiac_issue === 'true',
    };

    try {
      let response;
      if(PersonalData)
      {
         response = await contextdata.axiosInstance.post('/patient/updatePersonalInfo', formattedData);
         if(response.data.status === 201)
         {
           toast.success('Personal Information updated successfully!');
          
         }
         
      
      }else
      {
         response = await contextdata.axiosInstance.post('/patient/addPersonalInfo',
          formattedData
         );
         if(response.data.status === 200)
          {
            toast.success('Personal Information Added successfully!');
            
          }
          setPatientId(response.data.data.patient_id);
          console.log("Response:",response.data.data.patient_id);
      }


    
      setStep((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitPersonalData = (data) => {
    setPersonalData(data);
    handleSendPersonalInfoServer(data);
  };

  return (
    <>
      <div className={PersonalCSS.container}>
        <h1 className={PersonalCSS.title}>Personal Information</h1>
        <form onSubmit={handleSubmit(handleSubmitPersonalData)}>
          <div style={{ display: 'flex', gap: '3rem' }}>
            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Patient Name <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register('patient_name', { required: 'Name is required' })}
                onChange={(e) => {
                  setValue('patient_name', e.target.value);
                  trigger('patient_name');
                }}
                type="text"
                placeholder="Enter Full Name..."
              />
              {errors.patient_name && <p className={PersonalCSS.fielderror}>{errors.patient_name.message}</p>}
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Birth date <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register('date_of_birth', { required: 'Date of birth is required' })}
                type="date"
              />
              {errors.date_of_birth && <p className={PersonalCSS.fielderror}>{errors.date_of_birth.message}</p>}
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Gender <span className={PersonalCSS.star}>*</span>
              </label>
              <select className={PersonalCSS.inputfield} {...register('gender', { required: 'Gender is required' })}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && <p className={PersonalCSS.fielderror}>{errors.gender.message}</p>}
            </div>
            <div className={PersonalCSS.fieldcoverdiv}>
     <label className={PersonalCSS.fieldlabel}>Country <span className={PersonalCSS.star}>*</span></label>
      <input
               className={PersonalCSS.inputfield}
                {...register("country_of_origin", {
                  required: true,
                  
                })}
                onChange={(e) => {
                  const { onChange } = register("country_of_origin");
                  onChange(e);
                  trigger("country_of_origin");
                }}
                type="text"
                placeholder="Enter country."
              />
              { 
                errors.country_of_origin && <p className={PersonalCSS.fielderror}>{errors.country_of_origin.message}</p>
              }
     </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '2rem' }}>
            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Weight <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register('weight', { required: 'Weight is required' })}
                type="number"
                placeholder="Enter weight"
              />
              {errors.weight && <p className={PersonalCSS.fielderror}>{errors.weight.message}</p>}
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Height <span className={PersonalCSS.star}>*</span>
              </label>
              <input
                className={PersonalCSS.inputfield}
                {...register('height', { required: 'Height is required' })}
                type="number"
                placeholder="Enter height"
              />
              {errors.height && <p className={PersonalCSS.fielderror}>{errors.height.message}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '3rem', marginTop: '2rem' }}>
            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Blood Pressure <span className={PersonalCSS.star}>*</span>
              </label>
              <label>
                <input {...register('blood_pressure', { required: true })} type="radio" value="true" /> Yes
              </label>
              <label>
                <input {...register('blood_pressure', { required: true })} type="radio" value="false" /> No
              </label>
              {errors.blood_pressure && <p className={PersonalCSS.fielderror}>{errors.blood_pressure.message}</p>}
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Diabetic <span className={PersonalCSS.star}>*</span>
              </label>
              <label>
                <input {...register('is_diabetic', { required: true })} type="radio" value="true" /> Yes
              </label>
              <label>
                <input {...register('is_diabetic', { required: true })} type="radio" value="false" /> No
              </label>
              {errors.is_diabetic && <p className={PersonalCSS.fielderror}>{errors.is_diabetic.message}</p>}
            </div>

            <div className={PersonalCSS.fieldcoverdiv}>
              <label className={PersonalCSS.fieldlabel}>
                Cardiac Issue <span className={PersonalCSS.star}>*</span>
              </label>
              <label>
                <input {...register('cardiac_issue', { required: true })} type="radio" value="true" /> Yes
              </label>
              <label>
                <input {...register('cardiac_issue', { required: true })} type="radio" value="false" /> No
              </label>
              {errors.cardiac_issue && <p className={PersonalCSS.fielderror}>{errors.cardiac_issue.message}</p>}
            </div>
          </div>

          <div style={{ display: 'flex', marginTop: '1rem', justifyContent: 'right' }}>
            {PersonalData ? (
              <button className={PersonalCSS.submitbtn} type="submit">
                Update
              </button>
            ) : (
              <button className={PersonalCSS.submitbtn} type="submit">
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
