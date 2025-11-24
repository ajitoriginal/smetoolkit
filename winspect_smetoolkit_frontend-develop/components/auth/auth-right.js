import { useState } from "react";
import styles from "./auth-right.module.scss";
import LoginBox from "./login-box";
import ResetBox from "./reset-box";
import ChangeBox from "./change-box";

export default function AuthRight() {
  const [authScreen, setAuthScreen] = useState("login");

  const loginScreen = () => {
    setAuthScreen("login");
  };

  const resetScreen = () => {
    setAuthScreen("reset");
  };

  const changeScreen = () => {
    setAuthScreen("change");
  };

  return (
    <div className={`${styles.rightLogin} dFlex justifyC alignC`}>
      <div className={`${styles.rightLoginInner} dFlex justifyC alignC w-100`}>
        <img src="/images/logo.svg" alt="logo" className={styles.rightLogo} />
        <div className={styles.activity}>
          {authScreen === "login" && <LoginBox resetScreen={resetScreen} />}
          {authScreen === "reset" && (
            <ResetBox loginScreen={loginScreen} changeScreen={changeScreen} />
          )}
          {authScreen === "change" && <ChangeBox loginScreen={loginScreen} />}
        </div>
      </div>
    </div>
  );
}
