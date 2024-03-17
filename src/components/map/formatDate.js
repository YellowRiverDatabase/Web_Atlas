export function formatDate(date) {
  var year = Math.abs(date).toString();
  var era = date < 0 ? " BCE" : " CE";
  return year + era;
}
