/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import { MIcon } from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { HeaderGroup } from 'react-table';

interface Props {
  headerGroups: Array<HeaderGroup>;
}

export default function TableHeader({ headerGroups }: Props) {
  // const renderSort = useCallback((column: HeaderGroup) => {
  //   if (column.id === 'actions') return null;
  //   if (column.isSorted) {
  //     if (column.isSortedDesc) {
  //       return (
  //         <MIcon
  //           icon="sort-down"
  //           size="1rem"
  //           theme="secondary"
  //         />
  //       );
  //     }
  //     return (
  //       <MIcon
  //         icon="sort-up"
  //         size="1rem"
  //         theme="secondary"
  //       />
  //     );
  //   }
  //   return (
  //     <MIcon
  //       icon="dash-lg"
  //       size="1rem"
  //       theme="secondary"
  //     />
  //   );
  // }, []);

  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr
          {...headerGroup.getHeaderGroupProps()}
          className="bg-gray-100 border-bottom border-gray-200"
        >
          {headerGroup.headers.map((column) => (
            <th
              className="p-3 small"
              // {...(column.id === 'actions')
              //   ? { ...column.getHeaderProps() }
              //   : { ...column.getHeaderProps(column.getSortByToggleProps()) }}
              {...column.getHeaderProps()}
            >
              <div className="d-flex justify-content-between">
                {column.render('Header')}
                <span className="text-gray-500">
                  {/* {renderSort(column)} */}
                </span>
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
