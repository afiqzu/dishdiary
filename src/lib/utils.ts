import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateStr: string): string {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const date = new Date(dateStr);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;

  const formatted = `${day} ${month} ${year}, ${hours}:${minutesFormatted} ${ampm}`;
  return formatted;
}