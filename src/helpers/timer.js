export const secondsToHmsDisplay = (seconds) => {
  seconds = Number(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);
  const hDisplay = h >= 0 ? (h >= 10 ? `${h}:` : `0${h}:`) : '';
  const mDisplay = m >= 0 ? (m >= 10 ? `${m}:` : `0${m}:`) : '';
  const sDisplay = s >= 0 ? (s >= 10 ? `${s}` : `0${s}`) : '';
  return hDisplay + mDisplay + sDisplay;
};
