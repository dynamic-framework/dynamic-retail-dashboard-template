import {
  MCarousel,
  MCarouselSlide,
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
    <div className="pb-4">
      <MCarousel
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
          breakpoints: {
            1200: {
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
          <MCarouselSlide
            key={account.id}
            className="d-flex align-items-stretch py-3"
          >
            <AccountSlide account={account} />
          </MCarouselSlide>
        ))}
      </MCarousel>
    </div>
  );
}
