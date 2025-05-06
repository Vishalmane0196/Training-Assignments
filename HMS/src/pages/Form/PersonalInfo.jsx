import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import personalCSS from "../../style/Personal.module.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCountryName } from "../../redux/asyncThunkFuntions/extra";
import { Select } from "src/components/Select/Select";
import { Input } from "src/components/Input/Input";
import _ from "lodash";
import { Controller } from "react-hook-form";

import {
  addPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
} from "../../redux/asyncThunkFuntions/user";
import { Radio } from "src/components/Radio/Radio";
import { Button } from "src/components/Button/Button";

export const PersonalInfo = ({
  setCount,
  setStep,
  setPatientId,
  patientId,
}) => {
  const dispatch = useDispatch();

  const [PersonalData, setPersonalData] = useState(null);

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    defaultValues: {
      patient_name: PersonalData?.patient_name || "",
      date_of_birth: PersonalData?.date_of_birth || "",
      gender: PersonalData?.gender || "",
      weight: PersonalData?.weight || "",
      height: PersonalData?.height || "",
      country_of_origin: PersonalData?.country_of_origin || "",
      is_diabetic: PersonalData?.is_diabetic ?? "",
      cardiac_issue: PersonalData?.cardiac_issue ?? "",
      blood_pressure: PersonalData?.blood_pressure ?? "",
    },
  });

  const validateCountry = useCallback(
    _.debounce(async (value) => {
      try {
        const response = await dispatch(fetchCountryName(value)).unwrap();

        return Array.isArray(response) && response.length > 0
          ? true
          : "Invalid Country Name";
      } catch (e) {
        console.error(e);
        return "Invalid Country Name";
      }
    }, 2000),
    []
  );

  const handleSendPersonalInfoServer = async (data) => {
    const formattedData = {
      ...data,
      blood_pressure: data.blood_pressure === "true" ? 1 : 0,
      is_diabetic: data.is_diabetic === "true" ? 1 : 0,
      cardiac_issue: data.cardiac_issue === "true" ? 1 : 0,
      patient_id: patientId,
      weight: data.weight.toString(),
    };

    try {
      if (PersonalData) {
        let obj = {
          blood_pressure: PersonalData.blood_pressure,
          cardiac_issue: PersonalData.cardiac_issue,
          country_of_origin: PersonalData.country_of_origin,
          date_of_birth: new Date(PersonalData.date_of_birth)
            .toISOString()
            .split("T")[0],
          gender: PersonalData.gender,
          height: PersonalData.height,
          is_diabetic: PersonalData.is_diabetic,
          patient_name: PersonalData.patient_name,
          weight: PersonalData.weight.toString(),
          patient_id: patientId,
        };
        if (JSON.stringify(obj) == JSON.stringify(formattedData)) {
          console.log("Updated");
        } else {
          await dispatch(updatePersonalInfo(formattedData)).unwrap();
          toast.success("Personal Information updated successfully!");
        }
      } else {
        let data2 = {
          ...data,
          is_diabetic: data.is_diabetic == 1 ? true : false,
          cardiac_issue: data.cardiac_issue == 1 ? true : false,
          blood_pressure: data.blood_pressure == 1 ? true : false,
        };

        let response = await dispatch(addPersonalInfo(data2)).unwrap();

        toast.success("Personal Information Added successfully!");

        dispatch(setPatientId(response.data.patient_id));
        dispatch(setCount(1));
      }
      dispatch(setStep(1));
    } catch (error) {
      console.error(error);
      toast.error("Failed to add/update Personal Information");
    }
  };

  const handleSubmitPersonalData = (data) => {
    setPersonalData(data);
    if (errors) {
      toast.error(errors);
    }
    handleSendPersonalInfoServer(data);
  };

  const getPersonalData = async () => {
    if (patientId == null) {
      return;
    } else {
      try {
        let response = await dispatch(getPersonalInfo(patientId)).unwrap();

        if (response.data[0]) {
          setPersonalData(response.data[0]);
        }

        reset({
          blood_pressure:
            response.data[0].blood_pressure == 1 ? "true" : "false",
          cardiac_issue: response.data[0].cardiac_issue == 1 ? "true" : "false",
          country_of_origin: response.data[0].country_of_origin,
          date_of_birth: new Date(response.data[0].date_of_birth)
            .toISOString()
            .split("T")[0],
          gender: response.data[0].gender,
          height: response.data[0].height,
          is_diabetic: response.data[0].is_diabetic == 1 ? "true" : "false",
          patient_name: response.data[0].patient_name,
          weight: response.data[0].weight,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getPersonalData();
  }, []);

  return (
    <>
      <div className={personalCSS.container}>
        {console.log(errors)}

        <form onSubmit={handleSubmit(handleSubmitPersonalData)}>
          <div style={{ display: "flex", gap: "3rem" }}>
            <Input
              label="Patient Name"
              require="Patient Name"
              register={register}
              trigger={trigger}
              fieldName="patient_name"
              maxlength="20"
              errors={errors}
              type="text"
              pattern={{
                message: "Invalid Pattern",
                value: /^[A-Za-z]{2,}(?:[ '-][A-Za-z]+)*$/,
              }}
              placeholder="Enter Full Name."
            />

            <Input
              label="Date of Birth"
              require="Birth Date"
              register={register}
              trigger={trigger}
              fieldName="date_of_birth"
              errors={errors}
              max={new Date().toISOString().split("T")[0]}
              type="date"
            />

            <div className={personalCSS.fieldCoverDiv}>
              <label className={personalCSS.fieldLabel}>
                Gender <span className={personalCSS.star}>*</span>
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
                      { other: ["Non Binary", "Trans", "Asexual", "Bisexual"] },
                    ]}
                  />
                )}
              />
              <p className={personalCSS.fielderror}>
                {errors.gender && (
                  <span className="error">{errors.gender.message}</span>
                )}
              </p>
            </div>
            <Input
              label="Country"
              require="Country Name "
              register={register}
              maxlength="20"
              trigger={trigger}
              fieldName="country_of_origin"
              errors={errors}
              validate={validateCountry}
              type="text"
              placeholder="Enter Country."
            />
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <Input
              label="	Weight (kg)"
              require="Weight "
              register={register}
              trigger={trigger}
              fieldName="weight"
              errors={errors}
              type="number"
              placeholder="Enter in kg."
              min={10}
              max={100}
            />

            <Input
              label="Height (feet)"
              require="Height "
              register={register}
              trigger={trigger}
              fieldName="height"
              errors={errors}
              type="number"
              placeholder="Enter in feet."
              min="1"
              max="9.90"
              step="0.01"
            />
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "1rem" }}>
            <Radio
              label="Has Diabetic Issues?"
              require="Diabetic Field"
              register={register}
              fieldName="is_diabetic"
              errors={errors}
              type="radio"
            />

            <Radio
              label="Has Cardiac Issues?  "
              require="Cardiac Field"
              register={register}
              fieldName="cardiac_issue"
              errors={errors}
              type="radio"
            />
            <Radio
              label="Has Blood Pressure?"
              require="Blood Pressure"
              register={register}
              fieldName="blood_pressure"
              errors={errors}
              type="radio"
            />
          </div>

          <div
            style={{
              display: "flex",
              marginTop: "0.3rem",
              justifyContent: "right",
            }}
          >
            {PersonalData ? (
              <Button
                text="Update"
                type={"submit"}
                ripple={personalCSS.ripple}
                style={personalCSS.submitBtn}
              />
            ) : (
              <Button
                text="Next"
                type={"submit"}
                ripple={personalCSS.ripple}
                style={personalCSS.submitBtn}
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

// prop validation

PersonalInfo.propTypes = {
  setCount: PropTypes.func.isRequired,
  setStep: PropTypes.func.isRequired,
  setPatientId: PropTypes.func.isRequired,
  patientId: PropTypes.any,
};
