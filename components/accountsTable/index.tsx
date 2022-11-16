import useTable, { type Col } from 'hooks/useTable';
import { formattingAccount } from 'lib/formatting';
import { Account } from 'model/db';
import React, { useEffect } from 'react';
import Link from 'next/link';

interface Props {
  data?: Account[] | null;
}

function AccountsTable({ data }: Props) {
  const { columns, rows, setColumns, setData } = useTable<Account>();

  useEffect(() => {
    if (data) {
      setData(formattingAccount(data));

      if (!columns) {
        const col: Col<Account>[] = [
          { key: 'id', header: '아이디', isHidden: true },
          {
            key: 'broker_id',
            header: '증권사',
          },
          {
            key: 'user_name',
            header: '고객명',
          },
          {
            key: 'number',
            header: '계좌번호',
          },
          {
            key: 'name',
            header: '계좌명',
          },
          {
            key: 'status',
            header: '계좌상태',
          },
          {
            key: 'assets',
            header: '평가금액',
          },
          {
            key: 'payments',
            header: '입금금액',
          },
          {
            key: 'is_active',
            header: '계좌활성화여부',
          },
          {
            key: 'created_at',
            header: '계좌개설일',
          },
        ];
        setColumns(col);
      }
    }
  }, [columns, data, setColumns, setData]);

  return (
    <div className="borer">
      <table className="table-auto w-full">
        <thead>
          <tr>
            {columns?.map(({ key, header, isHidden }) =>
              isHidden ? null : (
                <th
                  key={key}
                  className="p-2 text-center
                border border-grey bg-gg_grey"
                >
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={index} className="p-2">
              {row.map(({ key, value, isHidden }) => {
                if (isHidden) return null;
                if (key === 'number') {
                  const id = row.find(({ key }) => key === 'id')?.value;
                  if (id) {
                    return (
                      <td key={key}>
                        <Link href={`/account/${id}`}>{value}</Link>
                      </td>
                    );
                  }
                }
                return (
                  <td key={key} className="p-1">
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountsTable;
