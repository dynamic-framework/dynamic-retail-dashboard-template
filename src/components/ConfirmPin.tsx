import { DButton, DInputPin, DAlert } from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../store/hooks';
import { getPinActivateAccount } from '../store/selectors';

export default function ConfirmPin() {
  const { t } = useTranslation();
  const [pin, setPin] = useState<string>('');

  const pinBase = useAppSelector(getPinActivateAccount);

  return (
    <div className="p-4 pt-0">
      <h4 className="mb-4">{t('cardStatus.confirmPin')}</h4>
      <p className="text-gray-500">{t('cardStatus.createPinDescription')}</p>

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

      {Number(pin.length) === 4 && pinBase !== pin && (
        <DAlert showIcon soft type="primary">
          {t('cardStatus.errorPin')}
        </DAlert>
      )}

      <div>
        <DButton
          text={t('activate')}
          disabled={Number(pin.length) < 4 || pinBase !== pin}
          className="w-100 d-block"
          pill
        />
      </div>
    </div>
  );
}
