import { Activity } from '../services/interface';

export default function getInitials(activity: Activity) {
  const [name, surname] = activity.name.split(' ', 2);
  const initials = surname ? `${name[0]}${surname[0]}` : `${name[0]}${name[1]}`;
  return initials.toLocaleUpperCase();
}
