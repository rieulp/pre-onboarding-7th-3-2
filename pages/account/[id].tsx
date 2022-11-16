import Layout from 'components/Layout/dashboard';
import useAccountDetail from 'hooks/useAccountDetail';
import useInput from 'hooks/useInput';
import { formattingAccount } from 'lib/formatting';
import { Account } from 'model/db';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from 'pages/_app';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AccountDetailPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [id, setId] = useState<string>();
  const { accountDetailData, isError, isLoading } = useAccountDetail(id);
  const [data, setData] = useState<Record<keyof Account, string>>();

  const [name, setName, onChangeName] = useInput();

  useEffect(() => {
    if (typeof router.query.id === 'string') setId(router.query.id);
  }, [router.query.id]);

  useEffect(() => {
    if (accountDetailData && accountDetailData.length) {
      const formatData = formattingAccount(accountDetailData);
      if (formatData) {
        setData(formatData[0]);
        setName(formatData[0].name);
      }
    }
  }, [accountDetailData, setName]);

  if (isError) return <div>에러</div>;
  if (isLoading) return <div>로딩중</div>;

  return (
    <Container className="p-1">
      <div className="bg-white m-4">
        <form
          className="grid grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(e);
          }}
        >
          <div className="item">
            <label className="name">고객명</label>
            <label className="value">{data?.user_id}</label>
          </div>
          <div className="item">
            <label className="name">증권사</label>
            <label className="value">{data?.broker_id}</label>
          </div>
          <div className="item">
            <label className="name">계좌상태</label>
            <label className="value">{data?.status}</label>
          </div>
          <div className="item">
            <label className="name">계좌번호</label>
            <label className="value">{data?.number}</label>
          </div>
          <div className="item">
            <label className="name">계좌명</label>
            <input className="value" value={name} onChange={onChangeName} />
          </div>
          <div className="item">
            <label className="name">평가금액</label>
            <label className="value money">{data?.assets}</label>
          </div>
          <div className="item">
            <label className="name">입금금액</label>
            <label className="value money">{data?.payments}</label>
          </div>
          <div className="item">
            <label className="name">계좌활성화여부</label>
            <label className="value">{data?.is_active}</label>
          </div>
          <div className="item">
            <label className="name">개설일</label>
            <label className="value">{data?.created_at}</label>
          </div>
          <div className="item">
            <label className="name">수정일</label>
            <label className="value">{data?.updated_at}</label>
          </div>
          <div className="p-4 col-span-2 text-right">
            <button className="editButton" type="submit">
              수정하기
            </button>
          </div>
        </form>
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

    label.value {
      /* color: #888; */
    }

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
  }
  .money {
    text-align: right;
  }
  .editButton {
    border: 1px solid #468ff7;
    background: #468ff7;
    padding: 0.5rem 1rem;
    color: white;
  }
`;
