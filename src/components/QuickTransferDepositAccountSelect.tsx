import { useTranslation } from 'react-i18next';
import { DInputSelect } from '@dynamic-framework/ui-react';

import type { Dispatch, SetStateAction } from 'react';

import { useAppSelector } from '../store/hooks';
import { getDepositAccounts } from '../store/selectors';

import type { Account } from '../services/interface';

type Props = {
  selected: Account;
  onSelect: Dispatch<SetStateAction<Account>>;
};

export default function QuickTransferDepositAccountSelect({ selected, onSelect }: Props) {
  const { t } = useTranslation();
  const depositAccounts = useAppSelector(getDepositAccounts);

  return (
    <DInputSelect
      innerId="selectAccountFrom"
      label={t('transfer.from')}
      valueExtractor={({ accountNumber }: Account) => accountNumber}
      labelExtractor={({ name, accountNumber }: Account) => `${name} ••• ${accountNumber}`}
      options={depositAccounts}
      selectedOption={selected}
      onEventChange={({ detail: account }: CustomEvent<Account>) => onSelect(account)}
    />
  );
}
