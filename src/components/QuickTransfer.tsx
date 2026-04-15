import { DButton, DBox } from '@dynamic-framework/ui-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TRANSFER_URL } from '../config/widgetConfig';
import useContactsEffect from '../services/hooks/useContactsEffect';
import { useAppSelector } from '../store/hooks';
import { getTransferFromAccount, getSelectedContact } from '../store/selectors';

import QuickTransferLoader from './loaders/QuickTransferLoader';
import QuickTransferAmountInput from './QuickTransferAmountInput';
import QuickTransferContactSelect from './QuickTransferContactSelect';
import QuickTransferDepositAccountSelect from './QuickTransferDepositAccountSelect';

export default function QuickTransfer() {
  const { t } = useTranslation();
  const { loading } = useContactsEffect();

  const transferFromAccount = useAppSelector(getTransferFromAccount);
  const selectedContact = useAppSelector(getSelectedContact);

  const [amount, setAmount] = useState<number>();
  const [invalid, setInvalid] = useState(false);

  const transferWithParamsUrl = useMemo(() => {
    const queryParams = new URLSearchParams({
      contact_id: selectedContact?.id || '',
      from_account: transferFromAccount?.id || '',
      amount: amount?.toString() || '',
    }).toString();

    return `${TRANSFER_URL}?${queryParams}`;
  }, [selectedContact?.id, transferFromAccount?.id, amount]);

  if (loading) {
    return <QuickTransferLoader />;
  }

  return (
    <DBox className="gap-4 quick-transfer fade-in">
      <h4 className="mb-4">
        {t('transfer.title')}
      </h4>
      <div className="gap-4 d-flex flex-column quick-transfer-form">
        <QuickTransferDepositAccountSelect />
        <QuickTransferContactSelect />
        <QuickTransferAmountInput
          value={amount}
          onChange={setAmount}
          invalid={invalid}
        />
        {!amount && (
          <DButton
            text={t('transfer.actionSingle')}
            color="primary"
            onClick={() => setInvalid(true)}
          />
        )}
        {amount && (
          <a
            className="btn btn-primary"
            href={transferWithParamsUrl}
          >
            {t('transfer.actionSingle')}
          </a>
        )}
      </div>
    </DBox>
  );
}
