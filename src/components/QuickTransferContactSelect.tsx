import { useTranslation } from 'react-i18next';
import { DQuickActionButton } from '@dynamic-framework/ui-react';

import { TRANSFER_URL } from '../config/widgetConfig';

import type { Contact } from '../services/interface';

type Props = {
  selected: Contact;
};

export default function QuickTransferContactSelect({ selected } : Props) {
  const { t } = useTranslation();

  if (!selected) {
    return null;
  }

  const goToTransfer = () => {
    window.location.href = TRANSFER_URL;
  };

  return (
    <div className="d-flex flex-column gap-2">
      <small className="fw-bold text-gray-500 px-2 d-inline-flex">{t('transfer.target')}</small>
      <DQuickActionButton
        line1={selected.name}
        line2={`${selected.bank} ${selected.accountNumber.slice(-3)}`}
        representativeImage={selected.image}
        onClick={goToTransfer}
        actionIcon="chevron-right"
      />
    </div>
  );
}
