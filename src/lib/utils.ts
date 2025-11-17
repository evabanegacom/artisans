import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string | undefined) => {
  if (!name) return "?";

  return name
    .trim()
    .split(/\s+/)                  // split by any whitespace
    .map(word => word[0]?.toUpperCase())  // take first letter of each word
    .slice(0, 2)                   // max 2 letters (first + last name)
    .join("");
};

// Usage in your JSX