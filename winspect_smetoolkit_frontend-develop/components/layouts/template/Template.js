import styles from "./template.module.scss";
import TemplateSideBar from "../../dashboard/template-sidebar";
import { redirect } from "../../../utils/storage";

const Template = (props) => {
  redirect("");
  const { backLink, className } = props;
  return (
    <>
      <div className={`wrapper ${className}`}>
        <TemplateSideBar backLink={backLink} />
        <div className={styles.homeContent}>{props.children}</div>
      </div>
      {props.loader && (
        <div className="loader dFlex alignC justifyC">
          <span></span>
        </div>
      )}
    </>
  );
};

export default Template;
