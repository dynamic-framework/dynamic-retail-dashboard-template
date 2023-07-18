import { useTranslation } from 'react-i18next';
import { MQuickActionButton } from '@modyo-dynamic/modyo-design-system-react';

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
      <h6 className="fw-bold px-2 sp">{t('transfer.target')}</h6>
      <MQuickActionButton
        line1={selected.name}
        line2={`${selected.bank} ${selected.accountNumber.slice(-3)}`}
        representativeImage={selected.image}
        onMClick={goToTransfer}
      />
    </div>
  );
}
