import {
  DAlert,
  DButton,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function CardActivateStatus() {
  const { openPortal } = useDPortalContext();
  const { t } = useTranslation();
  const [showAlert, setShowAlert] = useState(true);

  if (!showAlert) {
    return null;
  }

  return (
    <DAlert
      showClose
      color="info"
      onClose={() => setShowAlert(false)}
      className="mb-6"
    >
      <h5>{t('cardStatus.activateTitle')}</h5>
      <p className="m-0 mt-1 mb-4">{t('cardStatus.activateDescription')}</p>
      <DButton
        text={t('actions.moreInfo')}
        iconEnd="ArrowRight"
        color="info"
        onClick={() => openPortal('modalActivate', {})}
        variant="outline"
      />
    </DAlert>
  );
}
