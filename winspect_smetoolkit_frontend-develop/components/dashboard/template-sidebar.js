import useRemarkStore from "../../stores/remarkStore";
import styles from "./side-bar.module.scss";
import Link from "next/link";

export default function TemplateSideBar({ backLink }) {
  const { setSelectedRemarkType } = useRemarkStore();
  const handleBackClick = () => {
    setSelectedRemarkType("Functional");
  };
  return (
    <div
      className={`${styles.sideBar} dFlex justifySB alignC ${styles.inner} sidebar`}
      onClick={handleBackClick}
    >
      <Link href={`/${backLink}`}>
        <img src="/images/back-arrow.svg" alt="back-arrow" />
      </Link>
    </div>
  );
}
