import React from "react";
import Button from "./Button";
import Input from "./Input";
import useLoginInput from "./hooks/useLoginInput";
import { login } from "lib/api/auth";
import { useRouter } from "next/router";

const LoginForm = () => {
  const router = useRouter();
  const { userInput, handleInputChange, isValid } = useLoginInput();
  const { email, password } = userInput;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password).then(() => {
      router.replace("/account");
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="email"
        type="text"
        name="email"
        placeholder="아이디를 입력하세요"
        value={email}
        onChange={handleInputChange}
      />
      <Input
        label="password"
        type="password"
        name="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={handleInputChange}
      />
      <Button type="submit" disabled={!isValid}>
        로그인
      </Button>
    </form>
  );
};

export default LoginForm;
