import { MButton, MCollapse } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';
import useFrequentActivities from '../services/hooks/useFrequentActivities';
import CollapseActivityButton from './CollapseActivityButton';
import CollapseActivityDetail from './CollapseActivityDetail';
import { FORMAT_DATE } from '../config/widgetConfig';
import TableActivityLoader from './loaders/TableActivityLoader';

export default function PopoverFrequentAccounts() {
  const { loading, data } = useFrequentActivities();
  const { t } = useTranslation();

  if (loading) {
    return <TableActivityLoader />;
  }

  return (
    <>
      {data.map((activity, index) => (
        <div
          key={activity.id}
          className="d-block"
        >
          <MCollapse
            className="shadow-none bg-transparent border-bottom frequent-collapse"
            defaultCollapsed={index === 0}
            Component={(
              <CollapseActivityButton activity={activity} />
            )}
          >
            <div className="row">
              <CollapseActivityDetail
                className="border-top border-gray-200"
                label={t('frequent.date')}
                value={DateTime.fromISO(activity.effectiveDate).toFormat(FORMAT_DATE)}
              />
              <CollapseActivityDetail
                label={t('frequent.accountNumber')}
                value={activity.accountNumber}
              />
              <CollapseActivityDetail
                label={t('frequent.bank')}
                value={activity.bank}
              />
              <CollapseActivityDetail
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
    </>
  );
}
