import { useMemo } from 'react';
import { DButton, DStepper } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import useWidgetUtils from '../hooks/useWidgetUtils';
import { SCREENS } from '../config/widgetConfig';
import AccountCard from './AccountCard';
import { Account } from '../services/interface';

type Props = {
  account: Account
};

export default function ActivationStart(
  {
    account,
  }: Props,
) {
  const { t } = useTranslation();
  const { navigateTo } = useWidgetUtils();

  const options = useMemo(() => [
    {
      label: t('cardStatus.steps.order'),
      value: 1,
    },
    {
      label: t('cardStatus.steps.shipped'),
      value: 2,
    },
    {
      label: t('cardStatus.steps.delivered'),
      value: 3,
    },
  ], [t]);

  return (
    <div className="p-4 pt-0">
      <h4 className="mb-4">{t('cardStatus.activateTitle')}</h4>
      <p className="text-gray-500">
        {t('cardStatus.activationStartDescription')}
        {' '}
        <strong>{DateTime.now().toFormat('MMMM dd, yyyy')}</strong>
      </p>
      <div className="mb-8">
        <DStepper
          currentStep={2}
          options={options}
          vertical
        />
        <AccountCard className="activate-card-section rotate position-absolute" account={account} />
      </div>
      <div>
        <DButton
          onClick={() => navigateTo(SCREENS.activation)}
          text={t('activate')}
          className="w-100 d-block"
          pill
        />
      </div>
    </div>
  );
}
