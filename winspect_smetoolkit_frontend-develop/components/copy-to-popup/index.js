import styles from "../common/modal.module.scss";
import copyStyle from "./styles.module.scss";
import Templates from "./templates";
import Categories from "./categories";
import SubCategories from "./subcategories";
import useCopyToStore from "../../stores/copyToStore";

const CopyToPopup = () => {
  const { step } = useCopyToStore();
  return (
    <div
      className={`${styles.modalWrapper} modalWr  justifyC`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`${styles.modalbox} ${copyStyle.modalbox}`}>
        {step === 1 && <Templates />}
        {step === 2 && <Categories />}
        {step === 3 && <SubCategories />}
      </div>
    </div>
  );
};
export default CopyToPopup;
