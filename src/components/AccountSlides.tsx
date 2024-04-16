import {
  DCarousel,
  DCarouselSlide,
} from '@dynamic-framework/ui-react';
import { useAppSelector } from '../store/hooks';
import { getAccounts } from '../store/selectors';
import useAccounts from '../services/hooks/useAccounts';
import AccountSlide from './AccountSlide';
import AccountSlidesLoader from './loaders/AccountSlidesLoader';

export default function CategorySlides() {
  const { loading } = useAccounts();
  const accounts = useAppSelector(getAccounts);

  if (loading) {
    return <AccountSlidesLoader />;
  }

  if (!Object.keys(accounts).length) {
    return <>No accounts</>;
  }

  return (
    <div className="pb-6">
      <DCarousel
        options={{
          pagination: true,
          paginationKeyboard: false,
          perMove: 1,
          perPage: 1,
          height: 232,
          gap: 8,
          padding: 8,
          trimSpace: false,
          mediaQuery: 'min',
          arrows: false,
          type: 'loop',
          focus: 0,
          breakpoints: {
            [1400 + 252]: {
              perPage: 3,
            },
            576: {
              perPage: 2,
              arrows: true,
              padding: 16,
            },
          },
        }}
      >
        {accounts.map((account) => (
          <DCarouselSlide
            key={account.id}
            className="d-flex align-items-stretch py-4"
          >
            <AccountSlide account={account} />
          </DCarouselSlide>
        ))}
      </DCarousel>
    </div>
  );
}
