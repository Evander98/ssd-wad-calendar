const getLocalizedDate = (year, month, day, options) => {
  const date = new Date(year, month, day);
  return date.toLocaleDateString("en-US", options);
};

const hexToRgb = (hex) => {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
};

export const getDayName = (year, month, day) => {
  return getLocalizedDate(year, month, day, { weekday: "long" });
};

export const getMonthName = (month) => {
  return getLocalizedDate(1970, month, 1, { month: "long" });
};

export const getIsWeekend = (dayName) =>
  dayName === "Saturday" || dayName === "Sunday";

export const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getTextColorForBackground = (backgroundColor) => {
  const rgb = hexToRgb(backgroundColor);
  const brightness = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return brightness > 0.5 ? "#333333" : "#ffffff";
};

export const generateBackgroundTextColor = () => {
  const backgroundColor = generateRandomColor();
  const color = getTextColorForBackground(backgroundColor);
  return { backgroundColor, color };
};
