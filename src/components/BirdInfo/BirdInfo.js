import Title from 'components/Title';
import Subtitle from 'components/Subtitle';
import { getRegionIconByName } from 'lib/regions';
import FormatedContent from 'components/FormatedContent';

const BirdInfo = ({ title, regions, content, familyName }) => {
  return (
    <div className="bird-info | space-y-8 font-raleway md:flex md:items-center md:justify-between md:space-y-0 md:space-x-24">
      <div className="bird-info__header | flex justify-between space-x-8 md:w-2/6 md:shrink-0 md:flex-col md:space-x-0 md:space-y-12">
        <div className="bird-info__title md:space-y-4">
          <Title color={'green'}>{title}</Title>
          <Subtitle>{familyName}</Subtitle>
        </div>
        <div className="bird-info__regions | shrink-0 space-y-4">
          {regions.map((region) => (
            <div
              key={region.databaseId}
              className="bird-info__region | flex items-end space-x-2 md:flex-row-reverse md:justify-end md:space-x-reverse"
            >
              <div className="bird-info__region-name | text-xs md:text-xl">{region.name}</div>
              <div className="bird-info__region-icon w-[30px]">{getRegionIconByName(region.name)}</div>
            </div>
          ))}
        </div>
      </div>
      <FormatedContent content={content} />
    </div>
  );
};
export default BirdInfo;
