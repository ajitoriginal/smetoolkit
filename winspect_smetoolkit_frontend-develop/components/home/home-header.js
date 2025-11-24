import { useState, useEffect } from "react";
import styles from "./home-header.module.scss";
import { APIurl } from "../../utils/storage";

export default function HomeHeader({ setDisplay, createNew }) {
  const api = APIurl();
  const [activeTab, setActiveTab] = useState(0);
  const [local, setlocal] = useState();

  const tabname = ["Published", "Draft"];

  const handleTabClick = (index) => {
    localStorage.setItem("activeT", JSON.stringify(index));
    setActiveTab(index);
    setDisplay(index);
    createNew("");
  };

  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    const tabValue = isStored && JSON.parse(localStorage.getItem("activeT"));
    setlocal(local);
    setActiveTab(tabValue || 0);
  }, []);

  return (
    <div className={`${styles.homeHeader} dFlex justifySB alignC`}>
      <div className={`${styles.userDetail} dFlex alignC`}>
        <span className={`${styles.imgBox} dFlex alignC justifyC`}>
          <img src="/images/user.svg" alt="user icon" />
        </span>
        <div>
          <h1>Welcome Back</h1>
        </div>
      </div>
      <ul className={`${styles.toggleBar} dFlex`}>
        {tabname.map((item, index) => (
          <li
            key={index}
            className={activeTab === index ? styles.active : ""}
            onClick={() => handleTabClick(index)}
            id={item}
          >
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
