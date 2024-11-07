import { DAvatar } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_NAME, USER_FIRST_NAME } from '../config/widgetConfig';

const NAME = USER_FIRST_NAME.includes('undefined') ? DEFAULT_NAME : USER_FIRST_NAME;

export default function Greeting() {
  const { t } = useTranslation();

  return (
    <h3 className="d-inline-flex align-items-center gap-4">
      <DAvatar name={NAME} />
      {t('greeting', { NAME })}
    </h3>
  );
}
