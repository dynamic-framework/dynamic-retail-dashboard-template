/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-key */
import { HeaderGroup } from 'react-table';

interface Props {
  headerGroups: Array<HeaderGroup>;
}

export default function TableHeader({ headerGroups }: Props) {
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
              {...column.getHeaderProps()}
            >
              <div className="d-flex justify-content-between">
                {column.render('Header')}
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
