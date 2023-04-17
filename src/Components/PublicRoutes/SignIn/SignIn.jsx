import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../store/slices/userSlice";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./SignIn.css";
const SignIn = () => {
    const dispatch = useDispatch();
    const errorSignIn = useSelector((state) => state.user.error);
    return (
        <Formik
            initialValues={{
                login: "",
                password: "",
            }}
            validationSchema={Yup.object({
                password: Yup.string().required("Введите пароль!"),
                login: Yup.string().required("Введите логин!"),
            })}
            onSubmit={(body) => {
                const formData = new FormData();
                Object.entries(body).map(([key, value]) => {
                    return formData.append(`${key}`, value);
                });

                dispatch(signIn(formData));
            }}
        >
            <div className="wrapper_signin">
                <h1 className="head">Авторизация</h1>
                {errorSignIn ? <div>Неверный пароль,логин</div> : ""}
                <ErrorMessage
                    name="login"
                    className="error user"
                    component="div"
                />

                <Form className="signin">
                    <Field
                        className="user"
                        type="text"
                        placeholder="Введите login"
                        name="login"
                    />

                    <Field
                        className="pass"
                        type="password"
                        placeholder="Введите пароль"
                        name="password"
                    />

                    <button type="submit">&#xf0da;</button>
                </Form>
                <ErrorMessage
                    name="password"
                    className="error password"
                    component="div"
                />
            </div>
        </Formik>
    );
};

export default SignIn;
