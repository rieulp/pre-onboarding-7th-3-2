import React, { useEffect, useRef, useState } from 'react';

export interface Col<K> {
  key: keyof K;
  header: string;
  isHidden?: boolean;
}

export interface Cell<K> {
  key: keyof K;
  value: string;
  isHidden?: boolean;
}

export type Row<K> = Cell<K>[];

function useTable<T>() {
  const [data, setData] = useState<Record<keyof T, string>[]>();
  const [columns, setColumns] = useState<Col<T>[]>();
  const [rows, setRows] = useState<Row<T>[]>();

  useEffect(() => {
    if (!data || !columns || !data.length || !columns.length) return;
    const rowData = data.map((value) =>
      columns.map(({ key, isHidden }) => ({ key, value: value[key], isHidden }))
    );
    setRows(rowData);
  }, [columns, data]);

  return { columns, setColumns, rows, setData };
}

export default useTable;
