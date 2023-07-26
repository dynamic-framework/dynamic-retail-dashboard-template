import CategoryListLoader from './loaders/CategoryListLoader';
import CategoryItem from './CategoryItem';
import { useAppSelector } from '../store/hooks';
import useAccounts from '../services/hooks/useAccounts';
import { getAccountsByCategory } from '../store/selectors';

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
    <div className="d-flex flex-column gap-5">
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
