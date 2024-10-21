import { DAvatar } from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { USER_FIRST_NAME } from '../config/widgetConfig';

export default function Greeting() {
  const name = useMemo(() => {
    if (USER_FIRST_NAME.includes('undefined')) {
      return 'John';
    }
    return USER_FIRST_NAME;
  }, []);

  const { t } = useTranslation();
  return (
    <h3 className="d-inline-flex align-items-center gap-4">
      <DAvatar name={name} />
      {t('greeting', { value: name })}
    </h3>
  );
}
