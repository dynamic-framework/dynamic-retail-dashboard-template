export default function AccountSlidesLoader() {
  return (
    <div className="d-flex placeholder-glow gap-4 mt-4">
      <span
        className="placeholder bg-secondary-200 col rounded-2"
        style={{
          height: '13rem',
        }}
      />
      <span
        className="d-none d-lg-block placeholder bg-secondary-200 col rounded-2"
        style={{
          height: '13rem',
        }}
      />
    </div>
  );
}
