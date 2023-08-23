import { MButton, MCollapse } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import useFrequentActivities from '../services/hooks/useFrequentActivities';
import CollapseButton from './CollapseButton';
import CollapseItemDetail from './CollapseItemDetail';
import { FORMAT_DATE } from '../config/widgetConfig';

export default function PopoverFrequentAccounts() {
  const { loading, data } = useFrequentActivities();
  const { t } = useTranslation();

  if (loading) {
    return null;
  }

  return (
    <div className="mt-4">
      <h5 className="fw-bold py-3">
        {t('frequent-transactions')}
      </h5>
      {data.map((activity, index) => (
        <div
          key={activity.id}
          className="d-block"
        >
          <MCollapse
            className="shadow-none bg-transparent border-bottom frequent-collapse"
            defaultCollapsed={index === 0}
            Component={(
              <CollapseButton activity={activity} />
            )}
          >
            <div className="row">
              <CollapseItemDetail
                className="border-top border-gray-200"
                label={t('frequent.date')}
                value={DateTime.fromISO(activity.effectiveDate).toFormat(FORMAT_DATE)}
              />
              <CollapseItemDetail
                label={t('frequent.accountNumber')}
                value={activity.accountNumber}
              />
              <CollapseItemDetail
                label={t('frequent.bank')}
                value={activity.bank}
              />
              <CollapseItemDetail
                label={t('frequent.actions')}
                value={(
                  <div className="d-flex justify-content-center">
                    <MButton
                      iconStart="three-dots-vertical"
                      variant="link"
                      theme="secondary"
                      className="frequent-collapse-actions"
                    />
                  </div>
                )}
              />
            </div>
          </MCollapse>
        </div>
      ))}
    </div>
  );
}
