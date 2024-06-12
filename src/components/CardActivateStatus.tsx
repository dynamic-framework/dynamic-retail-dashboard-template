import { DButton, useDPortalContext } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';
import Stepper from './Stepper';
import AccountCard from './AccountCard';
import { Account } from '../services/interface';

type Props = {
  account: Account
};

export default function CardActivateStatus(
  {
    account,
  }: Props,
) {
  const { openPortal } = useDPortalContext();
  const { t } = useTranslation();
  return (
    <div className="gradient-card-activate p-8 text-white rounded mb-8 overflow-hidden relative">
      <div className="d-flex align-items-start gap-10">
        <div className="flex-1">
          <Stepper width="200" />
          <h4>{t('cardStatus.activateTitle')}</h4>
          <p>{t('cardStatus.activateDescription')}</p>
          <DButton
            className="bg-white border-0 text-gray-900"
            text="More info"
            iconEnd="chevron-right"
            onClick={() => openPortal('modalActivate', {})}
          />
        </div>
        <div>
          <AccountCard className="activate-card-section" account={account} />
        </div>
      </div>
    </div>
  );
}
