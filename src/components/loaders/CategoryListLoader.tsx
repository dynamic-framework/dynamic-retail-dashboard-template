import { MSkeleton } from '@dynamic-framework/ui-react';

export default function CategoryListLoader() {
  return (
    <MSkeleton viewBox="0 0 320 188">
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="56" />
      <rect x="0" y="66" rx="8" ry="8" width="100%" height="56" />
      <rect x="0" y="132" rx="8" ry="8" width="100%" height="56" />
    </MSkeleton>
  );
}
