/* eslint-disable react/jsx-props-no-spreading */
import {
  MButton,
  MInputCurrency,
  MQuickActionButton,
  MInputSelect,
  useFormatCurrency,
} from '@modyo-dynamic/modyo-design-system-react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { Product } from '@modyo-dynamic/modyo-service-retail';

import QuickTransferLoader from './QuickTransferLoader';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getDepositProducts,
  getSelectedContact,
  getSelectedProduct,
} from '../store/selectors';
import { setSelectedProduct } from '../store/slice';
import useContacts from '../hooks/useContacts';
import { TRANSFER_URL } from '../config/widgetConfig';

export default function QuickTransfer() {
  const { format } = useFormatCurrency();
  const { t } = useTranslation();

  const [amount, setAmount] = useState<number>();

  const { loading } = useContacts();
  const dispatch = useAppDispatch();
  const depositProducts = useAppSelector(getDepositProducts);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const selectedContact = useAppSelector(getSelectedContact);

  const hintCurrency = useMemo(() => {
    if (amount === 0 || !selectedProduct) {
      return {
        message: t('hint.noAmount'),
        icon: 'info-circle',
      };
    }
    return {
      message: t('hint.withAmount', { amount: format(selectedProduct?.availableBalance) }),
      icon: 'info-circle',
    };
  }, [amount, format, selectedProduct, t]);

  const goToTransfer = () => {
    window.location.href = TRANSFER_URL;
  };

  const sendTransfer = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const queryParams = `?contact_id=${selectedContact?.id || ''}&from_account=${selectedProduct?.id || ''}&amount=${amount}`;
    window.location.href = `${TRANSFER_URL}${queryParams}`;
  }, [amount, selectedContact?.id, selectedProduct?.id]);

  if (loading) {
    return <QuickTransferLoader />;
  }

  return (
    <div className="bg-light d-flex flex-column p-3 rounded gap-3 quick-transfer">
      <h3 className="fs-5 fw-bold mx-2">
        {t('transfer.title')}
      </h3>
      <MInputSelect
        label={t('transfer.from')}
        mId="selectAccountFrom"
        valueExtractor={({ productNumber }: Product) => productNumber}
        labelExtractor={({ name, productNumber }: Product) => `${name} ••• ${productNumber}`}
        options={depositProducts}
        onMChange={({ detail: product }: CustomEvent<Product>) => (
          dispatch(setSelectedProduct(product))
        )}
      />
      <MInputCurrency
        label={t('transfer.total')}
        mId="amountToTransfer"
        hint={hintCurrency.message}
        onChange={(value) => setAmount(value)}
        value={amount}
        placeholder="$0,00"
      />
      {selectedContact && (
        <div className="d-flex flex-column gap-2">
          <h6 className="fw-bold px-2 sp">{t('transfer.target')}</h6>
          <MQuickActionButton
            line1={selectedContact.name}
            line2={`${selectedContact.bank} ${selectedContact.productNumber.slice(-3)}`}
            representativeImage={selectedContact.image}
            onMClick={goToTransfer}
          />
        </div>
      )}
      <MButton
        {...(!amount || amount <= 0 || !selectedProduct) && { state: 'disabled' }}
        text={t('transfer.actionSingle')}
        className="d-grid pt-2"
        isPill
        theme="primary"
        iconEnd="send"
        onMClick={sendTransfer}
      />
    </div>
  );
}
