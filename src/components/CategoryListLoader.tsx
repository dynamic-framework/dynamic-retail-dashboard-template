import { MSkeleton } from '@modyo-dynamic/modyo-design-system-react';
import { PREFIX_BS } from '@modyo-dynamic/modyo-design-system';

export default function CategoryListLoader() {
  return (
    <MSkeleton
      viewBox="0 0 320 576"
      backgroundColor={`var(--${PREFIX_BS}gray-100)`}
      foregroundColor={`var(--${PREFIX_BS}secondary-100)`}
    >
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="56" />
      <rect x="0" y="66" rx="0" ry="0" width="100%" height="112" />
      <rect x="0" y="188" rx="0" ry="0" width="100%" height="56" />
    </MSkeleton>
  );
}
