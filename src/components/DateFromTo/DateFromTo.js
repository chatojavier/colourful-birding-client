import { format } from 'date-fns';

const DateFromTo = ({ from, to }) => {
  const fromUpdated = new Date(from);
  const toUpdated = new Date(to);
  const dateFrom = new Date(fromUpdated.getTime() + fromUpdated.getTimezoneOffset() * 60000);
  const dateTo = new Date(toUpdated.getTime() + toUpdated.getTimezoneOffset() * 60000);
  const dateFromPattern = dateFrom.getFullYear() === dateTo.getFullYear() ? 'MMM d' : 'MMM d, yyyy';
  const dateFromFormatted = format(dateFrom, dateFromPattern);
  const dateToFormatted = format(dateTo, 'MMM d, yyyy');
  const differenceInTime = dateTo.getTime() - dateFrom.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24) + 1;
  const differenceInDaysFormatted = differenceInDays === 1 ? '1 day' : `${differenceInDays} days`;
  return (
    <span>
      <span className="inline-block">{dateFromFormatted}</span>
      <span className="inline-block">{dateFromFormatted !== dateToFormatted && <>&nbsp;- {dateToFormatted}</>}</span>
      <span className="inline-block">&nbsp;{'(' + differenceInDaysFormatted + ')'}</span>
    </span>
  );
};
export default DateFromTo;
