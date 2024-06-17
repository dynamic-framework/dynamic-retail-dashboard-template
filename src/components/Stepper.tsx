type Props = {
  width?: string
};

export default function Stepper(
  {
    width,
  }: Props,
) {
  return (
    <div
      style={{ width: `${width}px` }}
      className="stepper d-flex position-relative justify-content-between mb-4"
    >
      <span className="dot active" />
      <span className="dot" />
      <span className="dot" />
      <span className="dot" />
    </div>
  );
}
