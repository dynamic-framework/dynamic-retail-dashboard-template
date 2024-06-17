import { DButton, DInputPin } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPinActivateAccount } from '../store/slice';
import { getPinActivateAccount } from '../store/selectors';
import useWidgetUtils from '../hooks/useWidgetUtils';
import { SCREENS } from '../config/widgetConfig';

export default function CreatePin() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const pin = useAppSelector(getPinActivateAccount);
  const { navigateTo } = useWidgetUtils();

  return (
    <div className="p-4 pt-0">
      <h4 className="mb-4">{t('cardStatus.createPin')}</h4>
      <p className="text-gray-500">{t('cardStatus.createPinDescription')}</p>

      <div className="d-flex justify-content-center">
        <DInputPin
          characters={4}
          id="pinActivation"
          placeholder="0"
          onChange={(e) => dispatch(setPinActivateAccount(e))}
          type="text"
          className="mb-8"
        />
      </div>

      <div>
        <DButton
          text={t('activate')}
          disabled={!pin || Number(pin.length) < 4}
          className="w-100 d-block"
          pill
          onClick={() => navigateTo(SCREENS.confirmPin)}
        />
      </div>
    </div>
  );
}
