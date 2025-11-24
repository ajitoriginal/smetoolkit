import { url } from "../../utils/url";
import styles from "./change-box.module.scss";
import Link from "next/link";

export default function ChangeBox() {
  return (
    <div className={styles.changeBox}>
      <div className={styles.inputbox}>
        <label>Temporary password</label>
        <input type="email" placeholder="********" value="LRAJ@#!" />
      </div>
      <div className={styles.inputbox}>
        <label>New Password</label>
        <input type="password" placeholder="*******" />
      </div>
      <div className={styles.inputbox}>
        <label>Confirm password</label>
        <input type="password" placeholder="********" />
      </div>
      <div className={`${styles.btnWrapper} dFlex`}>
        <button className="btn outline-btn" href={url.login}>
          Cancel
        </button>
        <Link className="btn gradient-btn" href={url.login}>
          Login
        </Link>
      </div>
    </div>
  );
}
