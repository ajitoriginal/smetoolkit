import { url } from "../../../utils/url";
import { redirectBack } from "../../../utils/storage";
import styles from "./login.module.scss";

export default function LoginLayout(props) {
  redirectBack(url.publishTemplates, props.url);
  return (
    <section className="dFlex login-column-wrapper">
      <div className={`${styles.leftLogin} dFlex justifyC alignC gradient-bg`}>
        <img src="/images/login-logo.svg" alt="winspect logo" />
      </div>
      <div className={`${styles.rightLogin} dFlex justifyC alignC`}>
        <div
          className={`${styles.rightLoginInner} dFlex justifyC alignC w-100`}
        >
          <img src="/images/logo.svg" alt="logo" className={styles.rightLogo} />
          <div className={styles.activity}>{props.children}</div>
        </div>
      </div>
    </section>
  );
}
