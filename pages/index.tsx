import Layout from 'components/Layout/auth';
import useInput from 'hooks/useInput';
import { login } from 'api/api';
import type { NextPageWithLayout } from 'pages/_app';
import { useEffect, useState, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import Router from 'next/router';

interface Props {
  access_token?: string;
}

const Login: NextPageWithLayout<Props> = () => {
  const [email, setEmail, onChangeEmail] = useInput();
  const [password, setPassword, onChangePassword] = useInput();
  const [valid, setValid] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email.trim() && password.trim()) {
      const rep = await login(email, password);
      if (rep === true) {
        Router.replace('/account');
      } else {
        toast.error(rep.error, {
          hideProgressBar: true,
          autoClose: 1000,
          position: 'top-center',
        });
      }
    }
  };

  useEffect(() => {
    if (email.trim() && password.trim()) setValid(true);
    else setValid(false);
  }, [email, password]);

  return (
    <div className="w-2/5">
      <h1 className="text-center mb-10 text-3xl font-bold">PREFACE</h1>
      <div className="bg-white shadow-xl rounded">
        <div className="bg-lightgrey p-4">로그인</div>
        <form
          onSubmit={onSubmit}
          className="flex justify-center content-center flex-col gap-4
           p-4 "
        >
          <input
            value={email}
            onChange={onChangeEmail}
            type="email"
            required
            placeholder="아이디를 입력하세요"
            className="border-solid border border-grey p-1 px-4"
          />
          <input
            value={password}
            onChange={onChangePassword}
            type="password"
            required
            placeholder="비밀번호를 입력하세요"
            className="border-solid border border-grey p-1 px-4"
          />
          <button
            disabled={!valid}
            type="submit"
            className="disabled:bg-bg_grey disabled:text-grey
            disabled:border-grey p-1
            border-solid border border-primary bg-primary text-white"
          >
            로그인
          </button>
        </form>
      </div>
      <p className="text-center mt-5">ⓒ December and Company</p>
    </div>
  );
};

Login.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Login;
