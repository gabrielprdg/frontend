export function transformDate(date: string) {
  const dateClean = date?.split("");
  const newDate = dateClean?.slice(0,10)

  return newDate
}