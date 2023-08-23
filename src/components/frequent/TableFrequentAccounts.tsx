/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import {
  Column,
  useTable,
} from 'react-table';
import { useTranslation } from 'react-i18next';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import useFrequentActivities from '../../services/hooks/useFrequentActivities';

export default function TableMain() {
  const { loading, data } = useFrequentActivities();
  const { t } = useTranslation();

  const columns = useMemo<Column[]>(() => [
    { Header: t('frequent.for'), accessor: 'name' },
    { Header: t('frequent.date'), accessor: 'effectiveDate' },
    { Header: t('frequent.accountNumber'), accessor: 'accountNumber' },
    { Header: t('frequent.bank'), accessor: 'bank' },
    { Header: t('frequent.actions'), accessor: 'actions' },
  ], [t]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    { columns, data },
  );

  if (loading) {
    return null;
  }

  return (
    <table
      {...getTableProps()}
      className="w-100"
    >
      <TableHeader
        headerGroups={headerGroups}
      />
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow row={row} key={row.id} />
          );
        })}
      </tbody>
    </table>
  );
}
