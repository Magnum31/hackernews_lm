//Formatter util to handle the timestamps provided by the API
export const formatter = (unixTime: number): string => {
  try {
    const timestamp = new Date(unixTime * 1000);
    return timestamp.toLocaleString("en-Gb", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    return `Error: ${error}`;
  }
};
