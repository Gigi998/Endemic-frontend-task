import { useTable, usePagination } from 'react-table';
import { useCryptoContext } from '../context/appContext';
import { useEffect, useMemo } from 'react';
import { GrBookmark } from 'react-icons/gr';

export default function Table({ data, columns, initialState }) {
  const { searchTerm, toggleFavorites, addToFavorites, setPageIndex, removeFromFav } =
    useCryptoContext();

  // FIlter price_btc column
  const filteredColumns = useMemo(() => {
    if (searchTerm === '') {
      return columns;
    }
    return columns.filter(column => column.isVisible !== false);
  }, [columns, searchTerm]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // @ts-ignore
    page,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable(
    {
      columns: filteredColumns,
      data,
      initialState,
    },
    usePagination
  );

  useEffect(() => {
    setPageIndex(pageIndex);
  }, [pageIndex]);

  return (
    <div className="flex flex-col items-center justify-center text-slate-300">
      <table {...getTableProps()} className="main-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="bg-cyan-600 text-left h-10">
              {headerGroup.headers.map(header => (
                <th {...header.getHeaderProps()} className="px-2 font-bold">
                  {header.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()} className="px-2 p-1 text-sm">
                      {cell.column.id === 'isFavorites' ? (
                        <button
                          onClick={() => {
                            toggleFavorites(row.original.name);
                            cell.value === 'true'
                              ? removeFromFav(row.original.name)
                              : addToFavorites(row.original.name);
                          }}
                          className="bg-slate-300"
                        >
                          <GrBookmark
                            fontSize="2rem"
                            className={cell.value === 'true' ? 'bg-green-500' : 'bg-red-500'}
                          />
                        </button>
                      ) : (
                        cell.render('Cell')
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length > 20 && (
        <div className="flex items-center">
          <button onClick={() => previousPage()} className="text-4xl">
            {'<'}
          </button>
          <span className="p-5">
            <strong>
              {pageIndex + 1} / {pageOptions.length}
            </strong>
          </span>
          <button onClick={() => nextPage()} className="text-4xl">
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
}
