import styles from "./login-box.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import LoginServices from "../../api/services/LoginServices";
import { url } from "../../utils/url";
// import Link from "next/link";

export default function LoginBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowErro] = useState(false);
  const [loginInfo, setLoginInfo] = useState("");
  const [passwordType, setPasswordType] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  async function login() {
    localStorage.removeItem("userInfo");
    setLoader(true);
    let data = { email, password };
    let result = await LoginServices.login(data);

    if (result.status == 200) {
      localStorage.setItem("userInfo", JSON.stringify(result));
    }
    setShowErro(true);

    if (email != "" && password != "") {
      setLoginInfo(result);
    }

    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    if (local?.status == 200) {
      router.push(url.publishTemplates);
    }
    setLoader(false);
  }

  const togglePassword = (id) => {
    setPasswordType(id);
    if (passwordType === id) {
      setPasswordType();
    }
  };

  return (
    <div className={styles.loginbox}>
      <div
        className={`${styles.inputbox}
          ${showError && email == "" ? styles.error : ""}
          ${
            showError && loginInfo.message == "email must be a valid email"
              ? styles.error
              : ""
          }
          ${
            showError && loginInfo.message == "Invalid Credentials"
              ? styles.error
              : ""
          }
          `}
      >
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => {
            setEmail(e.target.value);
            setLoginInfo("");
          }}
        />
      </div>
      {showError && email === "" && (
        <p className="error left">Email can&apos;t be blank</p>
      )}
      {showError &&
        loginInfo &&
        email != "" &&
        password != "" &&
        loginInfo.message == "email must be a valid email" && (
          <p className="error left">Email must be a valid email</p>
        )}

      <div
        className={`${styles.inputbox}
          ${showError && password == "" ? styles.error : ""}
          ${
            showError && loginInfo.message == "Invalid Credentials"
              ? styles.error
              : ""
          }`}
      >
        <label>Password</label>
        <input
          type={passwordType === 0 ? "text" : "password"}
          placeholder="Enter your password"
          onChange={(e) => {
            setPassword(e.target.value);
            setLoginInfo("");
          }}
        />
        <span onClick={() => togglePassword(0)} className="eyeBtn">
          {passwordType === 0 ? (
            <img src="/images/eyeopen.svg" alt="eye icon" />
          ) : (
            <img src="/images/eye.svg" alt="eye icon" />
          )}
        </span>
      </div>
      {showError && password === "" && (
        <p className="error left">Password can&apos;t be blank</p>
      )}
      {showError &&
        loginInfo &&
        email != "" &&
        password != "" &&
        loginInfo.message == "Invalid Password" && (
          <p className="error left">Invalid Password</p>
        )}

      {/* <Link href={url.forgotPassword} className={styles.forgot}>
        Forgot Password?
      </Link> */}
      {showError &&
        loginInfo &&
        email != "" &&
        password != "" &&
        loginInfo.message == "Invalid Credentials" && (
          <p className="error left">Invalid Credentials</p>
        )}
      <br />

      <button onClick={login} className="btn gradient-btn">
        Login
      </button>
      {loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </div>
  );
}
