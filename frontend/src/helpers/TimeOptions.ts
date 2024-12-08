export function generateTimeOptions() {
  const times = [];
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  for (let i = 0; i < 24 * 4; i++) {
    const hours = start.getHours();
    const minutes = start.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    // Formatting time as hh:mm AM/PM
    const formattedTime = `${hours % 12 === 0 ? 12 : hours % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
    times.push(formattedTime);
    start.setMinutes(start.getMinutes() + 15); // Incrementing by 15 minutes
  }
  return times;
}
