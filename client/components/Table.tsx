import clsx from 'clsx';
import { useMemo, useState } from 'react';

export function Row({
  columns,
  dataSource,
}: {
  columns: Column[];
  dataSource: any;
}) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      {columns.map((col) => (
        <td
          key={col.title}
          className={clsx(`py-3 px-6 text-${col.align ?? 'left'}`)}
        >
          {col.render
            ? col.render(dataSource[col.dataIndex], dataSource)
            : dataSource[col.dataIndex]}
        </td>
      ))}
    </tr>
  );
}

interface Column {
  title: string;
  align?: 'left' | 'right' | 'center';
  dataIndex: string;
  render?: (item: any, data: any) => JSX.Element;
}

export default function Table<T>({
  columns,
  dataSource,
  pageSize = 10,
}: {
  columns: Column[];
  dataSource: T[];
  pageSize: number;
}) {
  const [current, setCurrentPage] = useState(1);
  const data = useMemo(
    () => dataSource.slice((current - 1) * pageSize, current * pageSize),
    [pageSize, current],
  );

  const pageCount = Math.ceil(dataSource.length / pageSize);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-screen min-h-screen bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full lg:w-5/6">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  {columns.map((item) => (
                    <th
                      key={item.title}
                      className={clsx(
                        'py-3 px-6',
                        `text-${item.align ?? 'left'}`,
                      )}
                    >
                      {item.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data.map((item) => (
                  <Row
                    // key={item.uuid}
                    columns={columns}
                    dataSource={item}
                  ></Row>
                ))}
              </tbody>
            </table>
            <div className="text-right">
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                  onClick={() => {
                    setCurrentPage(current - 1);
                  }}
                  disabled={current < 2}
                  className={clsx(
                    current < 2
                      ? 'cursor-not-allowed hover:bg-gray-200 text-gray-400'
                      : 'hover:bg-gray-300 text-gray-800',
                    'text-sm bg-gray-200 font-semibold py-2 px-4 rounded-r',
                  )}
                >
                  上一页
                </button>
                <button
                  onClick={() => {
                    setCurrentPage(current + 1);
                  }}
                  disabled={current > pageCount - 1}
                  className={clsx(
                    'text-sm bg-gray-200 font-semibold py-2 px-4 rounded-r',
                    current > pageCount - 1
                      ? 'cursor-not-allowed hover:bg-gray-200 text-gray-400'
                      : 'hover:bg-gray-300 text-gray-800',
                  )}
                >
                  下一页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
