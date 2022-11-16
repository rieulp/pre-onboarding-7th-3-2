import LoginLayout from "components/Layout/auth/LoginLayout";
import type { NextPageWithLayout } from "pages/_app";
import LoginForm from "components/auth/LoginForm";

const Login: NextPageWithLayout = () => {
  return <LoginForm />;
};

Login.getLayout = (page) => <LoginLayout>{page}</LoginLayout>;

export default Login;
