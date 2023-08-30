/* eslint-disable react/jsx-props-no-spreading */
import { Cell, Row } from 'react-table';
import { DButton } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { FORMAT_DATE } from '../config/widgetConfig';

interface Props {
  row: Row;
}

export default function TableRow({ row }: Props) {
  const renderCell = (cell: Cell) => {
    if (cell.column.id === 'effectiveDate') {
      return (
        <span className="sp text-gray-700">
          {DateTime.fromISO(cell.value as string).toFormat(FORMAT_DATE)}
        </span>
      );
    }
    if (cell.column.id === 'actions') {
      return (
        <DButton
          className="actions-btn"
          iconStart="three-dots-vertical"
          variant="link"
          theme="secondary"
          isPill
        />
      );
    }
    return (
      <span className="sp text-gray-700">
        {cell.render('Cell')}
      </span>
    );
  };

  return (
    <tr
      className="border-bottom border-gray-200"
      {...row.getRowProps()}
    >
      {row.cells.map((cell) => {
        const rendered = renderCell(cell);
        return (
          // eslint-disable-next-line react/jsx-key
          <td
            className="p-3"
            {...cell.getCellProps()}
          >
            {rendered}
          </td>
        );
      })}
    </tr>
  );
}
