export const hasErrorField = (
  error: unknown,
): error is { data: { error: string } } => {
  return (
    error !== null &&
    typeof error === "object" &&
    "data" in error &&
    error.data !== null &&
    typeof error.data === "object" &&
    "error" in error.data
  )
}
