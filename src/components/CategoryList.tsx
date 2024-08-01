import useAccounts from '../services/hooks/useAccounts';
import { useAppSelector } from '../store/hooks';
import { getAccountsByCategory } from '../store/selectors';

import CategoryItem from './CategoryItem';
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
        <CategoryItem
          key={category.id}
          name={category.name}
          type={category.type}
          accounts={category.accounts}
        />
      ))}
    </div>
  );
}
