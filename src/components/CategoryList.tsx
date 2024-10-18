import useAccounts from '../services/hooks/useAccounts';
import { useAppSelector } from '../store/hooks';
import { getAccountsByCategory } from '../store/selectors';

import Category from './Category';
import CategoryListLoader from './loaders/CategoryListLoader';

export default function CategoryList() {
  const { loading } = useAccounts();
  const categories = useAppSelector(getAccountsByCategory);

  if (loading) {
    return <CategoryListLoader />;
  }

  if (Object.keys(categories).length === 0) {
    return <>noAccounts</>;
  }

  return (
    <div className="d-flex flex-column gap-8">
      {categories.map((category) => (
        <Category
          key={category.id}
          name={category.name}
          accounts={category.accounts}
        />
      ))}
    </div>
  );
}
