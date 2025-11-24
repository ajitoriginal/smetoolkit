import styles from "./auth-left.module.scss";

export default function AuthLeft() {
  return (
    <div className={`${styles.leftLogin} dFlex justifyC alignC gradient-bg`}>
      <img src="/images/login-logo.svg" alt="winspect logo" />
    </div>
  );
}
