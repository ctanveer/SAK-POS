export function getDataFromStatus (status: "pending" | "preparing" | "ready" | "complete") {
  switch (status) {
    case "preparing":
      return { status, preparingTimestamp: new Date()}
    case "ready":
      return { status, readyTimestamp: new Date()}
    case "complete":
      return { status, servedTimestamp: new Date()}
    default:
      return { status }
  }
}