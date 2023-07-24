import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MButton } from '@dynamic-framework/ui-react';

import QuickTransferLoader from './loaders/QuickTransferLoader';
import QuickTransferDepositAccountSelect from './QuickTransferDepositAccountSelect';
import QuickTransferContactSelect from './QuickTransferContactSelect';
import QuickTransferAmountInput from './QuickTransferAmountInput';
import useContacts from '../services/hooks/useContacts';
import { TRANSFER_URL } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getFirstAccount, getFirstContact } from '../store/selectors';

import type { Account } from '../services/interface';

export default function QuickTransfer() {
  const { t } = useTranslation();
  const firstAccount = useAppSelector(getFirstAccount);
  const firstContact = useAppSelector(getFirstContact);

  const [amount, setAmount] = useState<number>();
  const [account, setAccount] = useState<Account>(firstAccount);

  const { loading } = useContacts();

  const sendTransfer = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const queryParams = `?contact_id=${firstContact?.id}&from_account=${account?.id}&amount=${amount}`;
    window.location.href = `${TRANSFER_URL}${queryParams}`;
  }, [amount, firstContact?.id, account?.id]);

  if (loading) {
    return <QuickTransferLoader />;
  }

  return (
    <div className="bg-light d-flex flex-column p-3 rounded gap-3 quick-transfer">
      <h3 className="fs-5 fw-bold mx-2">
        {t('transfer.title')}
      </h3>
      <QuickTransferDepositAccountSelect selected={account} onSelect={setAccount} />
      <QuickTransferAmountInput value={amount} onChange={setAmount} account={account} />
      <QuickTransferContactSelect selected={firstContact} />
      <MButton
        text={t('transfer.actionSingle')}
        className="d-grid pt-2"
        isPill
        theme="primary"
        iconEnd="send"
        onMClick={sendTransfer}
        isDisabled={!amount || amount <= 0 || !account}
      />
    </div>
  );
}
