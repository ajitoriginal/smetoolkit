import { useState } from "react";
import SideBar from "../../dashboard/side-bar";
import styles from "./main.module.scss";
import Header from "../header/Header";
import { redirect } from "../../../utils/storage";
const Main = (props) => {
  redirect("");
  const handleTabClick = (tab) => {
    setHomeTable(tab);
  };
  const [createNewstate, setCeateNewstate] = useState("");

  const createNew = (value) => {
    setCeateNewstate(value);
  };

  return (
    <>
      <div className="wrapper">
        <SideBar status={0} show />
        <div className={styles.rightCol}>
          <Header setDisplay={handleTabClick} createNew={createNew} />
          <div className={styles.homeContent}>{props.children}</div>
        </div>
      </div>
      {props.loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </>
  );
};

export default Main;
