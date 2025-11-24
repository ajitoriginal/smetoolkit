import LoginLayout from "../components/layouts/login/Login";
import { url } from "../utils/url";
import ChangeBox from "../components/auth/change-box";

export default function Login() {
  return (
    <LoginLayout url={url.changePassword}>
      <ChangeBox />
    </LoginLayout>
  );
}
