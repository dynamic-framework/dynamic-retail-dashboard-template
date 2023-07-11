import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormatCurrency } from '@modyo-dynamic/modyo-design-system-react';
import classnames from 'classnames';
import { liquidParser } from '@modyo-dynamic/modyo-design-system';
import type { Product } from '@modyo-dynamic/modyo-service-retail';
import { getProductValue } from '@modyo-dynamic/modyo-service-retail';

import { useAppSelector } from '../store/hooks';
import { getShowBalances } from '../store/selectors';

const PRODUCTS_PATH = {
  saving: liquidParser.parse('{{vars.product-path-saving}}'),
  checking: liquidParser.parse('{{vars.product-path-checking}}'),
  'credit-card': liquidParser.parse('{{vars.product-path-credit-card}}'),
  loan: liquidParser.parse('{{vars.product-path-loan}}'),
};

interface Props {
  product: Product;
}

export default function AccountItem(
  {
    product,
  }: Props,
) {
  const { format } = useFormatCurrency();
  const showBalances = useAppSelector(getShowBalances);
  const { t } = useTranslation();

  // eslint-disable-next-line arrow-body-style
  const productDebt = useMemo(() => {
    /*
    // TODO: meet.
    if (product.details.minimumPayment !== undefined) {
      return {
        label: t('minimum-payment'),
        value: product.details.minimumPayment,
      };
    }
    if (product.depositDetails?.balances.unavailable !== undefined) {
      return {
        label: t('pending-balance'),
        value: product.details.foundsOnHold,
      };
    }
    if (product.details.nextPayment !== undefined) {
      return {
        label: t('next-payment'),
        value: product.details.nextPayment,
      };
    }
    */
    return {
      label: '',
      value: 0,
    };
  }, []);

  const productAvailable = useMemo(() => {
    if (product.type === 'credit-card') {
      return t('available-quota');
    }
    if (product.type === 'loan') {
      return t('total-due');
    }
    return t('amount-available');
  }, [product, t]);

  const productPath = useMemo(() => (
    `${liquidParser.parse('{{site.url}}')}/${PRODUCTS_PATH[product.type]}?product_id=${product.id}`
  ), [product.id, product.type]);

  return (
    <a
      href={productPath}
      className={classnames(
        'cursor-pointer text-decoration-none text-body',
        'border-top',
        'pt-3',
        'd-flex flex-column flex-lg-row gap-3 justify-content-between',
      )}
    >
      <div className="d-flex gap-3 align-items-center">
        <div className="d-flex flex-column flex-grow-1">
          <p>{product.alias}</p>
          <small className="text-light-emphasis">{product.productNumber}</small>
        </div>
      </div>
      <div className="d-flex gap-3 align-items-center justify-content-between">
        <div className="text-start text-lg-end">
          <div className="sp text-light-emphasis">{productDebt.label}</div>
          <div className="sp text-light-emphasis">{productAvailable}</div>
        </div>
        <div className="d-flex flex-column text-end">
          {/* <div className="small">{showBalances ? format(productDebt.value) : '$ ***'}</div> */}
          <div className="sp">{showBalances ? format(getProductValue(product)) : '$ ***'}</div>
        </div>
      </div>
    </a>
  );
}
