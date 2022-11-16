import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

const useInput = (): [
  string,
  Dispatch<SetStateAction<string>>,
  (e: ChangeEvent<HTMLInputElement>) => void
] => {
  const [value, setValue] = useState('');
  const onChangeValue = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  return [value, setValue, onChangeValue];
};

export default useInput;
