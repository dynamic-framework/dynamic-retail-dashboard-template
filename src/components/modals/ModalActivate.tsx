import { DModal, useDPortalContext } from '@dynamic-framework/ui-react';
import { useCallback, useMemo } from 'react';

import { SCREENS } from '../../config/widgetConfig';
import useWidgetUtils from '../../hooks/useWidgetUtils';
import { useAppSelector } from '../../store/hooks';
import { getAccounts, getActivationView } from '../../store/selectors';
import ActivationCodeView from '../ActivationCodeView';
import ActivationStart from '../ActivationStart';
import ConfirmPin from '../ConfirmPin';
import CreatePin from '../CreatePin';

export default function ModalActivate() {
  const view = useAppSelector(getActivationView);
  const accounts = useAppSelector(getAccounts);
  const { navigateTo } = useWidgetUtils();

  const CurrentView = useMemo(() => {
    const VIEW_STEP = {
      [SCREENS.start]: ActivationStart,
      [SCREENS.activation]: ActivationCodeView,
      [SCREENS.createPin]: CreatePin,
      [SCREENS.confirmPin]: ConfirmPin,
    };
    return VIEW_STEP[view];
  }, [view]);

  const { closePortal } = useDPortalContext();

  const closePortalAndReset = useCallback(() => {
    closePortal();
    navigateTo(SCREENS.start);
  }, [closePortal, navigateTo]);

  return (
    <DModal
      name="modalActivate"
      centered
      staticBackdrop
    >
      <DModal.Header
        style={{ marginBottom: '-2rem', zIndex: 2 }}
        onClose={closePortalAndReset}
        showCloseButton
      />
      <DModal.Body className="py-3 px-5 overflow-hidden">
        <CurrentView account={accounts[0]} />
      </DModal.Body>
    </DModal>
  );
}
