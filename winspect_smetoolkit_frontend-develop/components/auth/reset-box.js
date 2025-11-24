import Link from "next/link";
import styles from "./reset-box.module.scss";
import { url } from "../../utils/url";

export default function ResetBox({ loginScreen, changeScreen }) {
  return (
    <div className={styles.resetBox}>
      <h3>Reset Password</h3>
      <p>
        A temporary password will be sent to
        <br /> your registered email ID
      </p>
      <h4>
        <span>Email</span> sam@wini.com
      </h4>
      <div className={`${styles.btnWrapper} dFlex`}>
        <Link href={url.login} className="btn outline-btn">
          Cancel
        </Link>
        <Link href={url.changePassword} className="btn gradient-btn">
          Send
        </Link>
      </div>
    </div>
  );
}
