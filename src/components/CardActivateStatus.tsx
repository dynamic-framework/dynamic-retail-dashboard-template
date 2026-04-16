import {
  DButton,
  DButtonIcon,
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
    <div
      className="mb-6 d-flex bg-primary-50 position-relative banner-activate"
    >
      <div className="cover-img" />
      <div className="py-6 pe-8 content-activate">
        <DButtonIcon
          icon="X"
          variant="link"
          className="position-absolute end-0 top-0 m-2"
          onClick={() => setShowAlert(false)}
        />
        <h5>{t('cardStatus.activateTitle')}</h5>
        <p className="m-0 mt-1 mb-4">{t('cardStatus.activateDescription')}</p>
        <DButton
          text={t('actions.moreInfo')}
          iconEnd="ArrowRight"
          color="info"
          onClick={() => openPortal('modalActivate', {})}
          variant="link"
        />
      </div>
    </div>
  );
}
