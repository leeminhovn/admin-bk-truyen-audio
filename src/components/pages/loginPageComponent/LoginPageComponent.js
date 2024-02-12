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
  wrap_main_login_submitButton,
} from "./LoginPageComponentStyle.module.scss";
import { useEffect, useState } from "react";
import NormalInput from "@/components/commons/inputs/normalInput/NormalInput";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";

const middleWareEmail = (text) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (emailRegex.test(text.trim())) {
    return "*Invalid email";
  } else if (text.length < 6) {
    return "*Password minimum 6 characters";
  }
  return "";
};
const middleWarePassword = (text) => {
  if (text.length < 6) {
    return "*Password minimum 6 characters";
  } else if (text.length.trim() === 0) {
    return "*Not be empty";
  }
  return "";
};

export default function LoginPageComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClickSubmit = () => {};
  useEffect(() => {}, [email, password]);

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
              <NormalInput id="email" />
            </div>
            <label htmlFor="password" className={wrap_main_login_label}>
              Password:
            </label>
            <div className={wrap_main_login_input}>
              <NormalInput
                onChange={({ target: { value } }) => {
                  setPassword(value);
                }}
                value={password}
                type="password"
                id="password"
              />
            </div>
            <div className={wrap_main_login_submitButton}>
              <ButtonNormal disabled onClick={handleClickSubmit}>
                Sign In
              </ButtonNormal>
            </div>
          </div>
        </CardWrapGeneral>
      </div>
    </div>
  );
}
