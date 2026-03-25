import { DLayout } from '@dynamic-framework/ui-react';

export default function AccountsGridLoader() {
  return (
    <DLayout
      gap={2}
      className="placeholder-glow"
    >
      {[1, 2, 3].map((i) => (
        <DLayout.Pane
          key={i}
          colsXs={12}
          colsMd={6}
          colsLg={4}
        >
          <span
            className="placeholder col-12 rounded-2 d-block"
            style={{ height: '13rem' }}
          />
        </DLayout.Pane>
      ))}
    </DLayout>
  );
}
