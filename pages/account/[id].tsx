import Layout from "components/Layout/dashboard/Layout";
import useAccountDetail from "hooks/useAccountDetail";
import useInput from "hooks/useInput";
import useUsers from "hooks/useUsers";
import { updateAccount, deleteAccount } from "lib/api/account";
import { formattingAccount } from "lib/formatting";
import { Account } from "model/db";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AccountDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [id, setId] = useState<string>();
  const { users } = useUsers();
  const {
    accountDetailData: data,
    isError,
    isLoading,
    refetch,
  } = useAccountDetail(id);
  const [formattedData, setData] = useState<Record<keyof Account, string>>();
  const [name, setName, onChangeName] = useInput();
  const [isActive, setIsActive] = useState<boolean>();
  const [isValid, setIsValid] = useState(false);

  const onChangeIsActive = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsActive(Number(e.target.value) === 1);
  };

  const onClickEdit = () => {
    updateAccount(id, { is_active: isActive, name }).then(() => refetch());
  };

  const onClickDelete = () => {
    deleteAccount(id).then(() => router.replace("/account"));
  };
  useEffect(() => {
    if (typeof router.query.id === "string") setId(router.query.id);
  }, [router.query.id]);

  useEffect(() => {
    setIsValid(
      name.trim() !== "" &&
        (isActive !== data?.is_active || name !== data?.name)
    );
  }, [data?.is_active, data?.name, isActive, name]);

  useEffect(() => {
    if (data) {
      const formatData = formattingAccount(data);
      if (formatData) {
        setData(formatData[0]);
        setName(formatData[0].name);
        setIsActive(data.is_active);
      }
    }
  }, [data, setName]);

  if (isError) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <Container className="p-1 w-full">
      <div className="bg-white m-4">
        <div className="grid grid-cols-2">
          <div className="item">
            <label className="name">고객명</label>
            <label className="value">
              {users?.find(({ id }) => id === data?.user_id)?.name}
            </label>
          </div>
          <div className="item">
            <label className="name">증권사</label>
            <label className="value">{formattedData?.broker_id}</label>
          </div>
          <div className="item">
            <label className="name">계좌상태</label>
            <label className="value">{formattedData?.status}</label>
          </div>
          <div className="item">
            <label className="name">계좌번호</label>
            <label className="value">{formattedData?.number}</label>
          </div>
          <div className="item">
            <label className="name">계좌명</label>
            <input
              className="value canEdit"
              value={name}
              onChange={onChangeName}
            />
          </div>
          <div className="item">
            <label className="name">평가금액</label>
            <label className="value money">{formattedData?.assets}</label>
          </div>
          <div className="item">
            <label className="name">입금금액</label>
            <label className="value money">{formattedData?.payments}</label>
          </div>
          <div className="item">
            <label className="name">계좌활성화여부</label>
            <select
              value={isActive ? 1 : 0}
              className="value canEdit"
              onChange={onChangeIsActive}
            >
              <option value={0}>비활성</option>
              <option value={1}>활성</option>
            </select>
          </div>
          <div className="item">
            <label className="name">개설일</label>
            <label className="value">{formattedData?.created_at}</label>
          </div>
          <div className="item">
            <label className="name">수정일</label>
            <label className="value">{formattedData?.updated_at}</label>
          </div>
          <div className="p-1 col-span-2 text-right">
            <button
              className="button editButton"
              disabled={!isValid}
              onClick={onClickEdit}
            >
              수정하기
            </button>
            <button className="button deleteButton" onClick={onClickDelete}>
              삭제하기
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AccountDetailPage;

AccountDetailPage.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

const Container = styled.div`
  .item {
    border: 1px #adadad solid;
    display: flex;
    align-items: center;

    label,
    input {
      height: 100%;
      padding: 0.5rem;
    }
  }
  .name {
    min-width: 150px;
    background: lightgray;
    font-weight: bold;
    text-align: center;
  }
  .value {
    width: 100%;
    color: #808080;
  }

  .canEdit {
    color: black;
    font-weight: 700;
  }
  .money {
    text-align: right;
  }

  .button {
    padding: 0.5rem 1rem;
    color: white;

    &:disabled {
      border: 1px solid #808080;
      background: #808080;
    }
  }
  .editButton {
    border: 1px solid #468ff7;
    background: #468ff7;
  }
  .deleteButton {
    border: 1px solid red;
    background: red;
  }
`;
