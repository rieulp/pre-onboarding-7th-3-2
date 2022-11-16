import { Col } from "hooks/useTable";
import { Account } from "model/db";

export const accountTableColumns: Col<Account>[] = [
  { key: "id", header: "아이디", isHidden: true },
  {
    key: "broker_id",
    header: "증권사",
  },
  {
    key: "user_id",
    header: "고객명",
  },
  {
    key: "number",
    header: "계좌번호",
  },
  {
    key: "name",
    header: "계좌명",
  },
  {
    key: "status",
    header: "계좌상태",
  },
  {
    key: "payments",
    header: "입금금액",
  },
  {
    key: "assets",
    header: "평가금액",
  },
  {
    key: "is_active",
    header: "계좌활성화여부",
  },
  {
    key: "created_at",
    header: "계좌개설일",
  },
];
