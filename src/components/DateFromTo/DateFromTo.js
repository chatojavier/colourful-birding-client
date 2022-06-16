const DateFromTo = ({ from, to }) => {
  const dateFrom = new Date(from);
  const dateTo = new Date(to);
  const dateFromOptions =
    dateFrom.getFullYear() === dateTo.getFullYear()
      ? { month: 'short', day: 'numeric' }
      : { month: 'short', day: 'numeric', year: 'numeric' };
  const dateFromFormatted = dateFrom.toLocaleDateString('en-US', dateFromOptions);
  const dateToFormatted = dateTo.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const daysOfDifference = Math.abs(dateTo.getDate() - dateFrom.getDate());
  const daysOfDifferenceFormatted = daysOfDifference === 1 ? '1 day' : `${daysOfDifference} days`;
  return (
    <span>
      <span className="inline-block">{dateFromFormatted}</span>
      <span className="inline-block">{dateFromFormatted !== dateToFormatted && <> - {dateToFormatted}</>}</span>
      <span className="inline-block">&nbsp;{'(' + daysOfDifferenceFormatted + ')'}</span>
    </span>
  );
};
export default DateFromTo;
