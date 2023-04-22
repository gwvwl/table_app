import React from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormPut = ({ getPutModal, onClosePut, data }) => {
  const initialValues = {
    port: data.port,
    culture: data.culture,
    transport_type: data.transport_type,
    transport_name: data.transport_name,
    transport_id: data.transport_id,
    trailer: data.trailer,
    driver_name: data.driver_name,
    driver_passport: data.driver_passport,
    driver_license: data.driver_license,
    driver_phone: data.driver_phone,
    // sender: data.sender ? data.sender : " ",
  };
  const initialNames = {
    port: "Port",
    culture: "Culture",
    transport_type: "Type trans.",
    transport_name: "Name trans.",
    transport_id: "Reg number",
    trailer: "Trailer",
    driver_name: "Full name",
    driver_passport: "Passport",
    driver_license: "Driver's license",
    driver_phone: "Phone",
    // sender: "Отправитель",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        // password: Yup.string().required("Введите пароль!"),
        // username: Yup.string().required("Введите user name!"),
      })}
      onSubmit={(body) => {
        const formData = new FormData();
        Object.entries(body).map(([key, value]) => {
          return formData.append(`${key}`, value);
        });

        getPutModal(formData);
      }}
    >
      <Form>
        <div className="form_put">
          {Object.keys(initialValues).map((key) => (
            <div
              className="put_input_wrapper"
              key={key}
              style={{ display: "flex" }}
            >
              <span>{initialNames[key]}</span>
              <Field
                className="pass"
                type="text"
                placeholder={key}
                name={key}
              />
              <ErrorMessage
                name={key}
                className="error password"
                component="div"
              />
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClosePut}>
            Exit
          </button>
          <button type="submit">Confirm</button>
        </div>
      </Form>
    </Formik>
  );
};

export default FormPut;
