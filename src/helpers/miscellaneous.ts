export const formatSecondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const colorMethod = (
  method: "POST" | "PATCH" | "PUT" | "GET" | "DELETE" | string
) => {
  switch (method) {
    case "POST":
      return "#2ecc71";
    case "PATCH":
      return "#f39c12";
    case "PUT":
      return "#9b59b6";
    case "GET":
      return "#3498db";
    case "DELETE":
      return "#e74c3c";
    default:
      return "#7f8c8d";
  }
};
