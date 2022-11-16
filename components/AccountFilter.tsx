import useInput from "hooks/useInput";
import { AccountsQuery } from "lib/api/account";
import {
  AccountStatus,
  accountStatusData,
  Broker,
  brokersData,
} from "model/data";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface Props {
  setQuery: React.Dispatch<React.SetStateAction<AccountsQuery>>;
}

function AccountFilter({ setQuery }: Props) {
  const [broker, setBroker] = useState<Broker>();
  const [isActive, setIsActive] = useState<number>();
  const [status, setStatus] = useState<AccountStatus>();
  const [search, setSearch, onChangeSearch] = useInput();
  const [searchedText, setSearchedText] = useState<string>();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchedText(search?.trim());
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLSelectElement) {
      const key = e.target.name as keyof AccountsQuery;
      const value = e.target.value;

      if (e.target.selectedIndex !== 0) {
        if (key === "broker_id") setBroker(value as Broker);
        if (key === "is_active") setIsActive(Number(value));
        if (key === "status") setStatus(value as AccountStatus);
      } else {
        if (key === "broker_id") setBroker(undefined);
        if (key === "is_active") setIsActive(undefined);
        if (key === "status") setStatus(undefined);
      }
    }
  };

  useEffect(() => {
    const newQuery: AccountsQuery = {};
    if (broker) newQuery.broker_id = broker;
    if (isActive !== undefined) newQuery.is_active = isActive === 1;
    if (status) newQuery.status = status;
    if (searchedText) newQuery.q = searchedText;
    setQuery(newQuery);
  }, [broker, isActive, searchedText, setQuery, status]);

  return (
    <AccountFilterContainer>
      <form onSubmit={onSubmit} onChange={onChange} ref={formRef}>
        <div className="item">
          <label>증권사</label>
          <select name="broker_id" value={broker}>
            <option selected>선택</option>
            {Object.keys(brokersData).map((key, i) => (
              <option key={i} value={key}>
                {brokersData[key as Broker]}
              </option>
            ))}
          </select>
        </div>
        <div className="item">
          <label>계좌활성여부</label>
          <select name="is_active" value={isActive ?? undefined}>
            <option selected>선택</option>
            <option value={1}>활성</option>
            <option value={0}>비활성</option>
          </select>
        </div>
        <div className="item">
          <label>계좌상태</label>
          <select name="status" value={status}>
            <option selected>선택</option>
            {Object.keys(accountStatusData).map((key, i) => (
              <option key={i} value={key}>
                {accountStatusData[key as AccountStatus]}
              </option>
            ))}
          </select>
        </div>
        <div className="item flex-1 p-1">
          <label>계좌명</label>
          <input name="q" value={search} onChange={onChangeSearch} />
          <button type="submit" className="searchButton">
            검색
          </button>
        </div>
      </form>
      {searchedText && (
        <div className="searchTextContainer">
          <label>검색된 내용</label>
          <p>{searchedText}</p>
          <button onClick={() => setSearchedText("")}>X</button>
        </div>
      )}
    </AccountFilterContainer>
  );
}

export default AccountFilter;
const AccountFilterContainer = styled.div`
  margin: 0 auto;
  form {
    display: flex;
    flex-wrap: wrap;
    font-size: 15px;
  }
  select,
  option {
    text-align: center;
    min-width: 100px;
    margin-right: 0.5rem;
  }

  .item {
    display: flex;
    align-items: center;
    label {
      display: block;
      padding: 12px 1rem;
      background: #3b8ef5;
      text-align: center;
      color: white;
    }
  }
  input {
    flex: 1;
    height: 100%;
    border: 2px solid #3b8ef5;
  }
  .searchButton {
    width: 100px;
    background: #3b8ef5;
    height: 100%;
    color: white;
    font-weight: 500;
  }
  .searchTextContainer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
    label {
      display: block;
      padding: 12px 1rem;
      background: #3b8ef5;
      text-align: center;
      color: white;
    }
    p {
      padding: 1rem 2rem;
    }
    button {
      width: 30px;
      height: 30px;
      text-align: center;
      color: white;
      background: #3b8ef5;
      border-radius: 30px;
    }
  }
`;
