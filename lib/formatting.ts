import { accountStatusData, brokerFormatData, brokersData } from 'model/data';
import { Account } from 'model/db';

// export const accountNumberFormat = (number: string, format: string) => {
//   const lens = format.split('-').map((val) => val.length);
//   let regexStr = lens.reduce((pre, len) => pre + `(\\d{0,${len}})`, '^');
//   let replaceStr = lens.reduce((pre, _, index) => pre + `$${index + 1}-`, '');
//   const reg = new RegExp(regexStr, 'g');
//   const result = number.replace(reg, replaceStr);
//   return result.slice(0, result.length - 1);
// };

export const accountNumberFormat = (number: string, format: string) => {
  const str = number.split('');
  for (let i = 2; i < str.length - 2; i++) str[i] = '*';
  const lens = format.split('-').map((val) => val.length);
  let regexStr = lens.reduce((pre, len) => pre + `(\\S{0,${len}})`, '^');
  let replaceStr = lens.reduce((pre, _, index) => pre + `$${index + 1}-`, '');
  const reg = new RegExp(regexStr, 'g');
  const result = str.join('').replace(reg, replaceStr);
  return result.slice(0, result.length - 1);
};

export const commaNumberFormat = (value: string | number) => {
  if (typeof value === 'string') {
    return Number(value).toLocaleString('ko-KR');
  }
  return value.toLocaleString('ko-KR');
};

export const dateFormat = (value: string | Date) => {
  if (typeof value === 'string') {
    const date = new Date(value);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
  return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
};
export const formattingAccount = (data?: Account[]) => {
  if (!data) return data;
  const newData: Record<keyof Account, string>[] = [];
  data.forEach(
    ({
      broker_id,
      status,
      number,
      assets,
      payments,
      is_active,
      created_at,
      updated_at,
      id,
      user_id,
      ...rest
    }) => {
      newData.push({
        id: id.toString(),
        user_id: user_id.toString(),
        broker_id: brokersData[broker_id],
        status: accountStatusData[status] + '',
        number: accountNumberFormat(number, brokerFormatData[broker_id]),
        assets: commaNumberFormat(assets),
        payments: commaNumberFormat(payments),
        is_active: is_active ? '활성' : '비활성',
        created_at: dateFormat(created_at),
        updated_at: dateFormat(updated_at),
        ...rest,
      });
    }
  );
  return newData;
};
