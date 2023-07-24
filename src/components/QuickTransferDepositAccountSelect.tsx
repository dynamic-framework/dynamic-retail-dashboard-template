import { useTranslation } from 'react-i18next';
import { MInputSelect } from '@dynamic-framework/ui-react';

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
    <MInputSelect
      mId="selectAccountFrom"
      label={t('transfer.from')}
      valueExtractor={({ accountNumber }: Account) => accountNumber}
      labelExtractor={({ name, accountNumber }: Account) => `${name} ••• ${accountNumber}`}
      options={depositAccounts}
      selectedOption={selected}
      onMChange={({ detail: account }: CustomEvent<Account>) => onSelect(account)}
    />
  );
}
