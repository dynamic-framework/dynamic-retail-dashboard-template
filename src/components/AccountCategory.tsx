import { useTranslation } from 'react-i18next';
import { MCollapse, MIcon, useFormatCurrency } from '@modyo-dynamic/modyo-design-system-react';
import type { Product, ProductType } from '@modyo-dynamic/modyo-service-retail';
import { ProductTypeConfig } from '@modyo-dynamic/modyo-service-retail';

import AccountItem from './AccountItem';
import { useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';

interface Props {
  name: string;
  total: number;
  type: ProductType;
  products: Array<Product>;
}

export default function AccountCategory(
  {
    name,
    total,
    type,
    products,
  }: Props,
) {
  const { format } = useFormatCurrency();
  const { t } = useTranslation();

  const showBalances = useAppSelector(getShowBalances);

  return (
    <MCollapse
      defaultCollapsed={!!products.length}
      className="rounded shadow-sm"
      Component={(
        <div className="d-flex align-items-center gap-3">
          <MIcon
            icon={ProductTypeConfig[type].icon}
            theme={ProductTypeConfig[type].theme}
            hasCircle
          />
          <h2 className="fs-6 flex-fill text-light-emphasis fw-bold text-truncate">{name}</h2>
          <small className="text-light-emphasis">{t('total')}</small>
          <p className="fw-bold text-dark">{showBalances ? format(total) : '$ ***'}</p>
        </div>
      )}
    >
      <div className="d-flex flex-column gap-3">
        {products.map((product) => (
          <AccountItem key={product.id} product={product} />
        ))}
      </div>
    </MCollapse>
  );
}
