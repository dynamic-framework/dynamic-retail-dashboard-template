import { DButton } from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TRANSFER_URL } from '../config/widgetConfig';
import useContacts from '../services/hooks/useContacts';
import { useAppSelector } from '../store/hooks';
import { getTransferFromAccount, getSelectedContact } from '../store/selectors';

import QuickTransferLoader from './loaders/QuickTransferLoader';
import QuickTransferAmountInput from './QuickTransferAmountInput';
import QuickTransferContactSelect from './QuickTransferContactSelect';
import QuickTransferDepositAccountSelect from './QuickTransferDepositAccountSelect';

export default function QuickTransfer() {
  const { t } = useTranslation();
  const { loading } = useContacts();

  const transferFromAccount = useAppSelector(getTransferFromAccount);
  const selectedContact = useAppSelector(getSelectedContact);

  const [amount, setAmount] = useState<number>();

  const sendTransfer = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const queryParams = new URLSearchParams({
      contact_id: selectedContact?.id || '',
      from_account: transferFromAccount?.id || '',
      amount: amount?.toString() || '',
    }).toString();

    window.location.href = `${TRANSFER_URL}${queryParams}`;
  }, [selectedContact?.id, transferFromAccount?.id, amount]);

  if (loading) {
    return <QuickTransferLoader />;
  }

  return (
    <div className="bg-surface-secondary d-flex flex-column p-4 rounded gap-4 quick-transfer">
      <h3 className="fs-5 fw-bold">
        {t('transfer.title')}
      </h3>
      <QuickTransferDepositAccountSelect />
      <QuickTransferAmountInput value={amount} onChange={setAmount} />
      <QuickTransferContactSelect />
      <DButton
        text={t('transfer.actionSingle')}
        theme="primary"
        iconEnd="send"
        onClick={sendTransfer}
        disabled={!amount || amount <= 0 || !transferFromAccount}
      />
    </div>
  );
}
