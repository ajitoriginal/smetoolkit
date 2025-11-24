import { useState, useEffect } from "react";
import styles from "./setting-change-password.module.scss";
import { useRouter } from "next/router";
import { APIurl } from "../../utils/storage";

export default function SettingChangePassword() {
  const api = APIurl();
  const router = useRouter();
  const [loader, setLoader] = useState(false);

  //calling local storage
  const [local, setlocal] = useState();
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  const [oldPassowrd, setOldPassowrd] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [showError, setShowErro] = useState(false);

  const [passwordeye, setpasswordeye] = useState(false);
  const [passwordneweye, setpasswordneweye] = useState(false);
  const [passwordconfirmeye, setpasswordconfirmeye] = useState(false);

  async function changePassword() {
    if (
      oldPassowrd != "" &&
      confirmpassword === password &&
      password.length > 7 &&
      password.match(/[A-Z]/g) &&
      password.match(/[a-z]/g) &&
      password.match(/[0-9]/g)
    ) {
      let result = await fetch(`${api}api/v1/auth/change-password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
        },
        body: JSON.stringify({
          newPassword: password,
          currentPassword: oldPassowrd,
        }),
      });
      result = await result.json();
      toastFunc(result);
      if (result?.status == 200) {
        setLoader(true);
        setTimeout(function () {
          localStorage.clear();
          router.push("/");
        }, 3000);
      }
    }
    setShowErro(true);
  }

  const [toast, setToast] = useState("");
  const toastFunc = (value) => {
    setToast(value);
    setTimeout(function () {
      setToast("");
    }, 4000);
  };

  return (
    <div className={styles.changePassword}>
      <h2>Change Password</h2>
      <div className={styles.passwordBox}>
        <div className={styles.inputbox}>
          <label>Old Password</label>
          <input
            type={passwordeye ? "text" : "password"}
            placeholder="Enter old password"
            onChange={(e) => setOldPassowrd(e.target.value)}
          />
          <span
            onClick={() => setpasswordeye(!passwordeye)}
            className="eyeBtn"
            id="oldpasswordEye"
          >
            {passwordeye ? (
              <img src="/images/eyeopen.svg" alt="eye icon" />
            ) : (
              <img src="/images/eye.svg" alt="eye icon" />
            )}
          </span>
        </div>
        {showError && oldPassowrd === "" && (
          <p className="error">Old Password can&apos;t be blank</p>
        )}
        <div className={styles.inputbox}>
          <label>New Password</label>
          <input
            type={passwordneweye ? "text" : "password"}
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setpasswordneweye(!passwordneweye)}
            className="eyeBtn"
            id="passwordEye"
          >
            {passwordneweye ? (
              <img src="/images/eyeopen.svg" alt="eye icon" />
            ) : (
              <img src="/images/eye.svg" alt="eye icon" />
            )}
          </span>
        </div>
        {showError && password === "" && (
          <p className="error">New Password can&apos;t be blank</p>
        )}
        {showError && password && password.length < 8 && (
          <p className="error">Password should have atleast 8 characters</p>
        )}
        {showError &&
          password &&
          password.length > 7 &&
          !password.match(/[a-z]/g) && (
            <p className="error">
              Password should contain atleast one lowercase letter
            </p>
          )}
        {showError &&
          password &&
          password.length > 7 &&
          !password.match(/[A-Z]/g) && (
            <p className="error">
              Password should contain atleast one uppercase letter
            </p>
          )}
        {showError &&
          password &&
          password.length > 7 &&
          !password.match(/[0-9]/g) && (
            <p className="error">Password should contain atleast one number</p>
          )}
        <div className={styles.inputbox}>
          <label>Confirm Password</label>
          <input
            type={passwordconfirmeye ? "text" : "password"}
            placeholder="Enter confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <span
            onClick={() => setpasswordconfirmeye(!passwordconfirmeye)}
            className="eyeBtn"
            id="confirmEye"
          >
            {passwordconfirmeye ? (
              <img src="/images/eyeopen.svg" alt="eye icon" />
            ) : (
              <img src="/images/eye.svg" alt="eye icon" />
            )}
          </span>
        </div>
        {showError && confirmpassword === "" && (
          <p className="error">Confirm Password can&apos;t be blank</p>
        )}
        {showError &&
          password &&
          confirmpassword &&
          password != confirmpassword && (
            <p className="error">New and Confirm password must be equal</p>
          )}
        <div className={styles.buttonWrapper}>
          <button
            className="btn gradient-btn"
            onClick={changePassword}
            id="changePassword"
          >
            Save
          </button>
        </div>
        {toast && (
          <p
            className={`poped-message ${toast.status != 200 ? "red" : ""} ${
              toast ? "active" : ""
            } ${styles.custompop}`}
          >
            {toast.status === 200
              ? "Your password has been changed successfully"
              : "Oops! Something went wrong, Try again"}
          </p>
        )}
        {loader && (
          <div className="loader dFlex alignC justifyC">
            <span></span>
          </div>
        )}
      </div>
    </div>
  );
}
