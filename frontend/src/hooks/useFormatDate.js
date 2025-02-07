import { useEffect } from "react";
import { useState } from "react";

export const useFormatDate = (date, format = "YYYY-MM-DD HH:mm:ss") => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (!date) return;
    const dateObj = new Date(date);

    if (isNaN(dateObj)) {
      setFormattedDate("Invalid Date");
      return;
    }

    const pad = (num) => String(num).padStart(2, "0");

    const month = pad(dateObj.getMonth() + 1);
    const day = pad(dateObj.getDate());
    const year = pad(dateObj.getFullYear());
    const hours = pad(dateObj.getHours());
    const minutes = pad(dateObj.getMinutes());
    const seconds = pad(dateObj.getSeconds());

    const formatted = format
      .replace("YYYY", year)
      .replace("MM", month)
      .replace("DD", day)
      .replace("HH", hours)
      .replace("mm", minutes)
      .replace("ss", seconds);

    setFormattedDate(formatted);
  }, [date, format]);

  return formattedDate;
};
