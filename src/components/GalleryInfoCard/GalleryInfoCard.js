import Button from 'components/Button';
import Title from 'components/Title';
import Subtitle from 'components/Subtitle';

const GalleryInfoCard = ({ title, subtitle, button }) => {
  return (
    <div className="gallery-info-card | space-y-8 md:max-w-[270px]">
      <div className="gallery-info-card__header | space-y-2">
        <Title color={'white'} className="max-w-[150px] md:max-w-none">
          {title}
        </Title>
        <Subtitle className="text-white">{subtitle}</Subtitle>
      </div>
      <div className="gallery-info-card__button">
        <Button
          path={button.path}
          color={button.color}
          filled
          className="block py-2 text-center text-base hover:!bg-white hover:!bg-opacity-80 md:inline-block"
        >
          {button.text}
        </Button>
      </div>
    </div>
  );
};
export default GalleryInfoCard;