import { getTextColorByName } from 'lib/util';

const Accommodations = ({ accomodations, color = 'lightblue' }) => {
  return (
    <div className="accommodations max-w-md">
      <table className="accommodations-table | w-full table-fixed border-collapse">
        <thead className="table-header border-b">
          <tr className={`text-xs uppercase md:text-sm ${getTextColorByName(color)}`}>
            <th className="cel-destination p-4">Destination</th>
            <th className="cel-accommodation p-4">Accommodation</th>
          </tr>
        </thead>
        <tbody>
          {accomodations.map((accommodation, index) => (
            <tr key={index} className="border-b text-center text-xs md:text-sm">
              <td className={`p-4 ${getTextColorByName(color)}`}>{accommodation.destination}</td>
              <td className="p-4">
                {accommodation.accomodation.url ? (
                  <a href={accommodation.accomodation.url}>{accommodation.accomodation.name}</a>
                ) : (
                  accommodation.accomodation.name
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Accommodations;
