import useTable from "hooks/useTable";
import { formattingAccount } from "lib/formatting";
import { Account } from "model/db";
import React, { useEffect } from "react";
import Link from "next/link";
import useUsers from "hooks/useUsers";
import styled from "styled-components";
import { accountTableColumns } from "./accountTableColumns";

interface Props {
  isError: boolean;
  isLoading: boolean;
  data?: Account[] | null;
}

function AccountsTable({ data, isError, isLoading }: Props) {
  const { users } = useUsers();
  const { columns, rows, setColumns, setData } = useTable<Account>();

  useEffect(() => {
    setData(data ? formattingAccount(data) : undefined);
    if (!columns) setColumns(accountTableColumns);
  }, [columns, data, setColumns, setData]);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러 발생</div>;
  if (!data || !users || !rows || !columns) return <div>데이터가 없습니다</div>;

  return (
    <TableContainer>
      <table>
        {/* TABLE HEAD */}
        <thead>
          <tr>
            {columns.map(({ key, header, isHidden }) =>
              isHidden ? null : <th key={key}>{header}</th>
            )}
          </tr>
        </thead>
        {/* TABLE BODY */}
        <tbody>
          {rows.map((row, index) => {
            return (
              /* TABLE ROW */
              <tr key={index}>
                {columns.map(({ key }) => {
                  /* 안보여주는 값 */
                  if (row[key].isHidden) return null;
                  /* 계좌번호일 때 상세페이지 링크 */
                  if (key === "number") {
                    return (
                      <td key={key}>
                        <Link href={`/account/${row.id.value}`}>
                          {row[key].value}
                        </Link>
                      </td>
                    );
                  }
                  /* 고객명일때 유저 이름 찾아서 보여줌 */
                  if (key === "user_id") {
                    const username = users.find(
                      ({ id }) => id.toString() === row[key].value.toString()
                    )?.name;
                    return <td key={key}>{username}</td>;
                  }
                  /* 평가금액일때 입금금액과 비교해서 글자색 다르게 보여줌 */
                  if (key === "assets") {
                    const profit =
                      Number(data[index]?.assets) -
                      Number(data[index]?.payments);
                    return (
                      <td
                        key={key}
                        className={
                          profit > 0
                            ? "text-red-500"
                            : profit < 0
                            ? "text-blue-500"
                            : "text-black"
                        }
                      >
                        {row[key].value}
                      </td>
                    );
                  }
                  /* 그 외 */
                  return (
                    <td key={key} className="p-1">
                      {row[key].value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </TableContainer>
  );
}

export default AccountsTable;

const TableContainer = styled.div`
  table {
    width: 100%;
  }
  thead {
    background: rgb(209 213 219);
  }
  th,
  td {
    padding: 0.8rem;
    border: 1px solid lightgray;
    border-left: 0;
  }
  th {
    border-color: white;
  }
`;
