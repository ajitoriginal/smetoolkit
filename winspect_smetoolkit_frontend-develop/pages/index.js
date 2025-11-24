import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { redirectBack } from "../utils/storage";
import { url } from "../utils/url";
const Homepage = () => {
  const router = useRouter();
  let path = url.publishTemplates;
  if (router.asPath !== "/") {
    path = router.asPath;
  }
  redirectBack(path, url.login);
  return (
    <div className={`${styles.homepage} dFlex justifyC alignC gradient-bg`}>
      <img src="/images/login-logo.svg" alt="winspect logo" />
    </div>
  );
};

export default Homepage;
