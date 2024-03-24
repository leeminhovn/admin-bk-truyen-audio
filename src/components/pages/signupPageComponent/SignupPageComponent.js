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
  bottom_signup,
  wrap_main_login_input_error,
  wrap_main_login_submitButton,
} from "./signupPageComponentStyle.module.scss";
import { useEffect, useState } from "react";
import NormalInput from "@/components/commons/inputs/normalInput/NormalInput";
import ButtonNormal from "@/components/commons/buttons/buttonNormal/ButtonNormal";
import {
  userLoginAction,
  userSignupAction,
} from "../../../../provider/redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validatePassword,
  valideName,
} from "@/utils/features/validate";
import Link from "next/link";

export default function SignupPageComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [error, setError] = useState({ email: "", password: "", name: "" });

  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter(); // Sử dụng useRouter hook
  const userStates = useSelector((state) => state.user);

  const handleClickSubmit = async () => {
    const { error } = await dispatch(
      userSignupAction({ email, password, setError, name: name.trim() })
    );
    !error && router.push("storys-managent");
  };

  useEffect(() => {
    if (
      email.length === 0 ||
      password.length === 0 ||
      name.length === 0 ||
      error?.name ||
      error?.email ||
      error?.password
    ) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [email, password, name]);

  const handleInputChange = (field, value) => {
    let setErrorField;
    let setValue = () => {
      setName(value);
    };
    if (field === "email") {
      setErrorField = validateEmail;
      setValue = setEmail;
    } else if (field === "password") {
      setErrorField = validatePassword;
      setValue = setPassword;
    } else {
      setErrorField = valideName;
    }

    setError((prevError) => ({ ...prevError, [field]: setErrorField(value) }));
    setValue(value);
  };
  return (
    <div className={wrap}>
      <div className={wrap_main}>
        <CardWrapGeneral>
          <div className={wrap_main_login}>
            <h2 className={wrap_main_login_title}>Create account</h2>
            <p className={wrap_main_login_des}>
              Please enter your name email and password to continue
            </p>
            <InputField
              id="name"
              label="Your account name:"
              type="text"
              value={name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              error={error.name}
            />
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

            <div className={wrap_main_login_submitButton}>
              <ButtonNormal
                disabled={isDisabled}
                is-loading={`${userStates.status === "login-loading"}`}
                onClick={handleClickSubmit}
              >
                Signup
              </ButtonNormal>
            </div>
            <div className={bottom_signup}>
              <span>Do you already have an account? </span>
              <Link href="/login">Login</Link>
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
