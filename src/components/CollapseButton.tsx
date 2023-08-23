import { FrequentActivity } from '../services/interface';
import getInitials from '../utils/getInitials';

type Props = {
  activity: FrequentActivity;
};

export default function CollapseButton({ activity }: Props) {
  return (
    <div className="d-flex gap-3 align-items-center">
      <div
        className="d-flex align-items-center justify-content-center collapse-button-activity"
      >
        <span className="fs-5 fw-bold text-secondary">
          {getInitials(activity)}
        </span>
      </div>
      <div className="flex-grow-1 fw-bold">
        {activity.name}
      </div>
    </div>
  );
}
