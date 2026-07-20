import { format } from 'date-fns';

export function formatCreatedAt(value: string) {
  return format(new Date(value), 'MMM d, yyyy');
}

export function formatCreatedAtTitle(value: string) {
  return format(new Date(value), "MMMM d, yyyy 'at' h:mm a");
}
