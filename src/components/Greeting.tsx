import { DAvatar } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_NAME, USER_FIRST_NAME } from '../config/widgetConfig';

const NAME = USER_FIRST_NAME.includes('undefined') ? DEFAULT_NAME : USER_FIRST_NAME;

export default function Greeting() {
  const { t } = useTranslation();

  return (
    <div className="d-inline-flex gap-4">
      <DAvatar name={NAME} />
      <div>
        <h3 className="mb-0 h4">{t('quickActions.title')}</h3>
        <p>{t('greeting', { name: NAME })}</p>
      </div>
    </div>
  );
}
