import { useState, useEffect } from "react";
import styles from "./right-settings.module.scss";
import SettingChangePassword from "./setting-change-password";
import Modal from "../common/modal";
import { useRouter } from "next/router";
import WarningModal from "../common/modals/warning-modal";

export default function RightSetting() {
  const [modal, setModal] = useState(false);
  const [local, setlocal] = useState();

  const close = (value) => {
    setModal(value);
  };

  const router = useRouter();

  const logOut = () => {
    localStorage.clear();
    router.push("/");
  };

  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  return (
    <section className={`${styles.rightProperty} dFlex`}>
      <div className={`${styles.settingBar} dFlex`}>
        <div className={`${styles.userDetail} dFlex alignC`}>
          <span className={`${styles.imgBox} dFlex alignC justifyC`}>
            <img src="/images/user.svg" alt="user icon" />
          </span>
          <div>
            <h2>
              {local?.body?.first} {local?.body?.last}
            </h2>
            <p>SME, Training </p>
          </div>
        </div>
        <ul className={styles.settingOptions}>
          <li className={styles.active}>
            <img src="/images/key.svg" alt="key icon" />
            Change Password
          </li>
          <li onClick={() => setModal(true)}>
            <img src="/images/logout.svg" alt="logout icon" />
            Sign out
          </li>
        </ul>
      </div>
      <SettingChangePassword />

      {modal && (
        <WarningModal
          heading="Signing out"
          warning="Are you sure to sign out from the devices, all the changes you have made will be save on the draft"
          btntext="Sign out"
          redirect={logOut}
          closeFunction={() => setModal(false)}
        />
      )}
    </section>
  );
}
