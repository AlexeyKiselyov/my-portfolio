export const monthsDiff = (iso: string) => {
  const now = new Date();
  const d = new Date(iso);
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 3600 * 24));
  return Math.floor(days / 30);
};
