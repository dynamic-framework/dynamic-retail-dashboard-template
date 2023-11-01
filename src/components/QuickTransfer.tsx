import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DButton } from '@dynamic-framework/ui-react';

import QuickTransferLoader from './loaders/QuickTransferLoader';
import QuickTransferDepositAccountSelect from './QuickTransferDepositAccountSelect';
import QuickTransferContactSelect from './QuickTransferContactSelect';
import QuickTransferAmountInput from './QuickTransferAmountInput';
import useContacts from '../services/hooks/useContacts';
import { TRANSFER_URL } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getTransferFromAccount, getSelectedContact } from '../store/selectors';

export default function QuickTransfer() {
  const { t } = useTranslation();
  const { loading } = useContacts();

  const transferFromAccount = useAppSelector(getTransferFromAccount);
  const selectedContact = useAppSelector(getSelectedContact);

  const [amount, setAmount] = useState<number>();

  const sendTransfer = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const queryParams = `?contact_id=${selectedContact?.id}&from_account=${transferFromAccount?.id}&amount=${amount}`;
    window.location.href = `${TRANSFER_URL}${queryParams}`;
  }, [selectedContact?.id, transferFromAccount?.id, amount]);

  if (loading) {
    return <QuickTransferLoader />;
  }

  return (
    <div className="bg-light d-flex flex-column p-3 rounded gap-3 quick-transfer">
      <h3 className="fs-5 fw-bold mx-2">
        {t('transfer.title')}
      </h3>
      <QuickTransferDepositAccountSelect />
      <QuickTransferAmountInput value={amount} onChange={setAmount} />
      <QuickTransferContactSelect />
      <DButton
        text={t('transfer.actionSingle')}
        isPill
        theme="primary"
        iconEnd="send"
        onClick={sendTransfer}
        isDisabled={!amount || amount <= 0 || !transferFromAccount}
      />
    </div>
  );
}
