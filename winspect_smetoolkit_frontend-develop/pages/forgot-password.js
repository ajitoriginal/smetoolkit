import LoginLayout from "../components/layouts/login/Login";

import ResetBox from "../components/auth/reset-box";
import { url } from "../utils/url";

export default function Login() {
  return (
    <LoginLayout url={url.forgotPassword}>
      <ResetBox />
    </LoginLayout>
  );
}
