import { format } from 'date-fns';

const DateFromTo = ({ from, to }) => {
  const fromUpdated = new Date(from);
  const toUpdated = new Date(to);
  const dateFrom = new Date(fromUpdated.getTime() + fromUpdated.getTimezoneOffset() * 60000);
  const dateTo = new Date(toUpdated.getTime() + toUpdated.getTimezoneOffset() * 60000);
  const dateFromPattern = dateFrom.getFullYear() === dateTo.getFullYear() ? 'MMM d' : 'MMM d, yyyy';
  const dateFromFormatted = format(dateFrom, dateFromPattern);
  const dateToFormatted = format(dateTo, 'MMM d, yyyy');
  const daysOfDifference = Math.abs(dateTo.getDate() - dateFrom.getDate() + 1);
  const daysOfDifferenceFormatted = daysOfDifference === 1 ? '1 day' : `${daysOfDifference} days`;
  return (
    <span>
      <span className="inline-block">{dateFromFormatted}</span>
      <span className="inline-block">{dateFromFormatted !== dateToFormatted && <>&nbsp;- {dateToFormatted}</>}</span>
      <span className="inline-block">&nbsp;{'(' + daysOfDifferenceFormatted + ')'}</span>
    </span>
  );
};
export default DateFromTo;
