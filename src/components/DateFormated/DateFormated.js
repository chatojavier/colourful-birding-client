import { format } from 'date-fns';

const DateFormated = ({ date, pattern = 'PPP' }) => {
  const dateFormatted = format(new Date(date), pattern);
  return <span>{dateFormatted}</span>;
};
export default DateFormated;
