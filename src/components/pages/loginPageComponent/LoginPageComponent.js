"use client";
import CardWrapGeneral from "@/components/commons/cardsWrap/cardWrapGeneral/CardWrapGeneral";
import {
  wrap,
  wrap_main,
  wrap_main_login,
  wrap_main_login_title,
  wrap_main_login_des,
  wrap_main_login_label,
  wrap_main_login_input,
  wrap_main_login_input_error,
  wrap_main_login_submitButton,
} from "./LoginPageComponentStyle.module.scss";
import { useEffect, useState } from "react";
import NormalInput from "@/components/commons/inputs/normalInput/NormalInput";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";

const validateEmail = (email) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return emailRegex.test(email.trim()) ? "" : "* Invalid email";
};

const validatePassword = (password) => {
  if (password.trim().length === 0) {
    return "* Not be empty";
  } else if (password.length < 6) {
    return "* Password minimum 6 characters";
  }
  return "";
};

export default function LoginPageComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickSubmit = () => {};
  useEffect(() => {
    console.log(isDisabled);
    if (
      email.length === 0 ||
      password.length === 0 ||
      error?.email ||
      error?.password
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password]);

  const handleInputChange = (field, value) => {
    const setErrorField = field === "email" ? validateEmail : validatePassword;

    setError((prevError) => ({ ...prevError, [field]: setErrorField(value) }));

    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
  };
  return (
    <div className={wrap}>
      <div className={wrap_main}>
        <CardWrapGeneral>
          <div className={wrap_main_login}>
            <h2 className={wrap_main_login_title}>Login to Account</h2>
            <p className={wrap_main_login_des}>
              Please enter your email and password to continue
            </p>
            <InputField
              id="email"
              label="Email address:"
              type="text"
              value={email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              error={error.email}
            />
            <InputField
              id="password"
              label="Password:"
              type="password"
              value={password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              error={error.password}
            />
            <div className={wrap_main_login_input}>
              <NormalInput
                onChange={({ target: { value } }) => {
                  setPassword(value);
                  setError({ ...error, password: middleWarePassword(value) });
                }}
                value={password}
                type="password"
                id="password"
              />
              <p className={wrap_main_login_input_error}>
                {error?.password || ""}
              </p>
            </div>
            <div className={wrap_main_login_submitButton}>
              <ButtonNormal disabled={isDisabled} onClick={handleClickSubmit}>
                Sign In
              </ButtonNormal>
            </div>
          </div>
        </CardWrapGeneral>
      </div>
    </div>
  );
}

function InputField({ id, label, type, value, onChange, error }) {
  return (
    <>
      <label htmlFor={id} className={wrap_main_login_label}>
        {label}
      </label>
      <div className={wrap_main_login_input}>
        <NormalInput id={id} type={type} value={value} onChange={onChange} />
        <p className={wrap_main_login_input_error}>{error || ""}</p>
      </div>
    </>
  );
}
