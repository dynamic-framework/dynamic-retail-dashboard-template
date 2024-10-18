import {
  DCarousel,
  DCarouselSlide,
} from '@dynamic-framework/ui-react';

import useAccounts from '../services/hooks/useAccounts';
import { useAppSelector } from '../store/hooks';
import { getAccounts } from '../store/selectors';

import AccountSlide from './AccountSlide';
import AccountSlidesLoader from './loaders/AccountSlidesLoader';

export default function CategorySlides() {
  const { loading } = useAccounts();
  const accounts = useAppSelector(getAccounts);

  return (
    <div className="pt-6 pb-10 px-6 bg-white rounded">
      {!Object.keys(accounts).length && <>No accounts</>}

      {loading && <AccountSlidesLoader />}

      {!loading && (
        <DCarousel
          options={{
            pagination: true,
            paginationKeyboard: false,
            perMove: 1,
            perPage: 1,
            gap: 8,
            trimSpace: false,
            mediaQuery: 'min',
            arrows: false,
            focus: 0,
            breakpoints: {
              768: {
                perPage: 2,
                padding: {
                  right: 24,
                },
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
      )}
    </div>
  );
}
