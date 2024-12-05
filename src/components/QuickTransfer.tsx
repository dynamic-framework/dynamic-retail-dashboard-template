import { DButton, DCard } from '@dynamic-framework/ui-react';
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
    <DCard className="quick-transfer bg-surface-secondary">
      <DCard.Body className="d-flex flex-column gap-4">
        <h4>
          {t('transfer.title')}
        </h4>
        <QuickTransferDepositAccountSelect />
        <QuickTransferAmountInput
          value={amount}
          onChange={setAmount}
          invalid={invalid}
        />
        <QuickTransferContactSelect />
        {!amount && (
          <DButton
            text={t('transfer.actionSingle')}
            theme="primary"
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
      </DCard.Body>
    </DCard>
  );
}
