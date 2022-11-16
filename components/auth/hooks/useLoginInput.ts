import React, { useEffect, useState } from "react";

const useLoginInput = () => {
  const [isValid, setIsValid] = useState(false);
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (userInput.email.trim() && userInput.password.trim()) setIsValid(true);
    else setIsValid(false);
  }, [userInput.email, userInput.password]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return { userInput, handleInputChange, isValid };
};

export default useLoginInput;
