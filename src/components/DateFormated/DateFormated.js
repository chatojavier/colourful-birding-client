const DateFormated = ({ date }) => {
  const dateUpdated = new Date(date);
  const dateFormatted = dateUpdated.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  return <span>{dateFormatted}</span>;
};
export default DateFormated;
