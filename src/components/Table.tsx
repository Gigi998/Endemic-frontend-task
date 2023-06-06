import { useTable, usePagination, Row, useSortBy } from 'react-table';
import { useCryptoContext } from '../context/appContext';
import { useEffect, useMemo, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { ColumnType, CustomColumn, InitStateProp } from '../types/trendingCrypto';

type TablePropsType = {
  data: ColumnType[];
  columns: CustomColumn[];
  initialState?: InitStateProp;
};

export default function Table({ data, columns, initialState }: TablePropsType) {
  const {
    searchTerm,
    addToFavorites,
    setPageIndex,
    removeFromFav,
    toggleFavorites,
    setTrendingCrypto,
  } = useCryptoContext();

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
    page,
    previousPage,
    nextPage,
    pageOptions,
    state: { pageIndex, pageSize },
    prepareRow,
  } = useTable(
    {
      columns: filteredColumns,
      data,
      initialState,
    },
    useSortBy,
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
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-2 font-bold"
                >
                  {column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row: Row<ColumnType>) => {
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
                          className="bg-slate-300 block mx-auto"
                        >
                          <AiFillStar
                            fontSize="2rem"
                            className={
                              cell.value === 'true' ? 'bg-[#171822] fill-amber-500' : 'bg-[#171822]'
                            }
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
