import React, { useEffect, useRef, useState } from 'react';

export interface Col<K> {
  key: keyof K;
  header: string;
}

export interface Cell<K> {
  key: keyof K;
  value: string;
}

export type Row<K> = Cell<K>[];

function useTable<T>() {
  const [data, setData] = useState<Record<keyof T, string>[]>();
  const [columns, setColumns] = useState<Col<T>[]>();
  const [rows, setRows] = useState<Row<T>[]>();

  useEffect(() => {
    if (!data || !columns || !data.length || !columns.length) return;
    const keys = columns.map(({ key }) => key);
    const rowData = data.map((value) =>
      keys.map((key) => ({ key, value: value[key] }))
    );
    setRows(rowData);
  }, [columns, data]);

  return { columns, setColumns, rows, setData };
}

export default useTable;
