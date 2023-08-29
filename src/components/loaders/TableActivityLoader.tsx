import { MSkeleton } from '@dynamic-framework/ui-react';

export default function TableActivityLoader() {
  return (
    <>
      <div className="d-block d-xl-none">
        <MSkeleton viewBox="0 0 60 20">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </MSkeleton>
      </div>
      <div className="d-none d-xl-block">
        <MSkeleton viewBox="0 0 60 10">
          <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
        </MSkeleton>
      </div>
    </>
  );
}
