import { DButton, DInputPin } from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SCREENS } from '../config/widgetConfig';
import useWidgetUtils from '../hooks/useWidgetUtils';
import { Account } from '../services/interface';

import AccountCard from './AccountCard';

type Props = {
  account: Account
};

export default function ActivationCodeView(
  {
    account,
  }: Props,
) {
  const { t } = useTranslation();
  const [pin, setPin] = useState<string>('');
  const { navigateTo } = useWidgetUtils();
  return (
    <div className="p-4 pt-0">
      <h4 className="mb-4">{t('cardStatus.activationCode')}</h4>
      <p className="text-gray-500">{t('cardStatus.activationCodeDescription')}</p>
      <div className="d-flex justify-content-center my-8">
        <AccountCard
          className="activate-card-section me-0"
          account={account}
        />
      </div>

      <div className="d-flex justify-content-center">
        <DInputPin
          characters={4}
          id="pinActivation"
          placeholder="0"
          onChange={(e) => setPin(e)}
          type="text"
          className="mb-8"
        />
      </div>

      <div>
        <DButton
          onClick={() => navigateTo(SCREENS.createPin)}
          text={t('continue')}
          disabled={!pin || Number(pin.length) < 4}
          className="w-100 d-block"
          pill
        />
      </div>
    </div>
  );
}
