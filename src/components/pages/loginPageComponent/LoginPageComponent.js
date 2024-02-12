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

const middleWareEmail = (text) => {
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!emailRegex.test(text.trim())) {
    return "* Invalid email";
  }
  return "";
};
const middleWarePassword = (text) => {
  if (text.length < 6) {
    return "* Password minimum 6 characters";
  } else if (text.trim().length === 0) {
    return "*Not be empty";
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
  console.log(error);
  return (
    <div className={wrap}>
      <div className={wrap_main}>
        <CardWrapGeneral>
          <div className={wrap_main_login}>
            <h2 className={wrap_main_login_title}>Login to Account</h2>
            <p className={wrap_main_login_des}>
              Please enter your email and password to continue
            </p>
            <label htmlFor="email" className={wrap_main_login_label}>
              Email address:
            </label>
            <div className={wrap_main_login_input}>
              <NormalInput
                id="email"
                value={email}
                onChange={({ target: { value } }) => {
                  setEmail(value);
                  setError({ ...error, email: middleWareEmail(value) });
                }}
              />
              <p className={wrap_main_login_input_error}>
                {error?.email || ""}
              </p>
            </div>
            <label htmlFor="password" className={wrap_main_login_label}>
              Password:
            </label>
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
