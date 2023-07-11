import { getProductValue } from '@modyo-dynamic/modyo-service-retail';

import type { Product, ProductType } from '@modyo-dynamic/modyo-service-retail';

import CategoryListLoader from './CategoryListLoader';
import { useAppSelector } from '../store/hooks';
import { getProductsByCategory } from '../store/selectors';
import AccountCategory from './AccountCategory';
import useProducts from '../hooks/useProducts';

export default function CategoryList() {
  const { loading } = useProducts();
  const categories = useAppSelector(getProductsByCategory);

  if (loading) {
    return <CategoryListLoader />;
  }

  if (!Object.keys(categories).length) {
    return <>noAccounts</>;
  }

  return (
    <div className="d-flex flex-column gap-5">
      {categories.map((category) => {
        // eslint-disable-next-line max-len
        const total = category.products.reduce<number>(
          (sum, product: Product) => (sum + getProductValue(product)),
          0,
        );
        return (
          <AccountCategory
            key={category.id}
            name={category.name}
            type={category.type as ProductType}
            total={total}
            products={category.products}
          />
        );
      })}
    </div>
  );
}
