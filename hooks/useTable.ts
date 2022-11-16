import { useEffect, useState } from "react";

export interface Col<K> {
  key: keyof K;
  header: string;
  isHidden?: boolean;
}

export interface Cell<T> {
  value: T;
  isHidden?: boolean;
}

export type Row<K> = Record<keyof K, Cell<K[keyof K]>>;

function useTable<T>() {
  const [data, setData] = useState<Record<keyof T, T[keyof T]>[]>();
  const [columns, setColumns] = useState<Col<T>[]>();
  const [rows, setRows] = useState<Row<T>[]>();

  useEffect(() => {
    if (!data || !columns) {
      setRows(undefined);
      return;
    }
    // if (!columns || !columns.length) return;

    const rowData = data.map((val) => {
      const newRow: Record<any, any> = {};
      columns.forEach(
        ({ key, isHidden }) => (newRow[key] = { value: val[key], isHidden })
      );
      return newRow as Row<T>;
    });
    setRows(rowData);
  }, [columns, data]);

  return { columns, setColumns, rows, setData };
}

export default useTable;
