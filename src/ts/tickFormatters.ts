import { getMinutes, getHours, parseISO, format, isMonday } from "date-fns";

export const format1DTimeXAxis = (dateTimeString: string) => {
  const date = parseISO(dateTimeString);
  const hours = getHours(date);
  const minutes = getMinutes(date);

  if (hours % 2 === 0 && minutes === 0) {
    const formattedTime = format(date, "h:mm a");
    return formattedTime; // Format as '2pm', '4pm', etc.
  }
  return ""; // Return empty string for non-matching times
};

export const format1WTimeXAxis = (dateTimeString: string) => {
  const date = parseISO(dateTimeString);
  const hours = getHours(date);
  const minutes = getMinutes(date);

  if (hours === 9 && minutes === 30) {
    return format(date, "MMM d");
  }
  return "";
};

export const format1MTimeXAxis = (dateTimeString: string) => {
  const date = parseISO(dateTimeString);
  const hours = getHours(date);
  const minutes = getMinutes(date);

  if (hours === 16 && minutes === 0) {
    if (isMonday(date)) {
        return format(date, "MMM d");
    }
  }
  return "";
};
