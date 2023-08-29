import { MSkeleton } from '@dynamic-framework/ui-react';

export default function AccountSlidesLoader() {
  return (
    <>
      <div className="d-block d-sm-none">
        <MSkeleton viewBox="0 0 200 130">
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </MSkeleton>
      </div>
      <div className="d-none d-sm-block d-xl-none">
        <MSkeleton viewBox="0 0 300 100">
          <rect x="0" y="0" rx="8" ry="8" width="145" height="100%" />
          <rect x="155" y="0" rx="8" ry="8" width="145" height="100%" />
        </MSkeleton>
      </div>
      <div className="d-none d-xl-block">
        <MSkeleton viewBox="0 0 300 70">
          <rect x="0" y="0" rx="8" ry="8" width="95" height="100%" />
          <rect x="100" y="0" rx="8" ry="8" width="95" height="100%" />
          <rect x="200" y="0" rx="8" ry="8" width="95" height="100%" />
        </MSkeleton>
      </div>
    </>
  );
}
