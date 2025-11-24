import LoginLayout from "../components/layouts/login/Login";
import LoginBox from "../components/auth/login-box";
import { url } from "../utils/url";

export default function Login() {
  return (
    <LoginLayout url={url.login}>
      <LoginBox />
    </LoginLayout>
  );
}
