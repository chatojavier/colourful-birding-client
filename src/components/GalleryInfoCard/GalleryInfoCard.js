import Button from 'components/Button';
import Title from 'components/Title';

const GalleryInfoCard = ({ title, subtitle, button }) => {
  return (
    <div className="gallery-info-card | space-y-8 md:max-w-[300px]">
      <div className="gallery-info-card__header | space-y-2">
        <Title color={'white'} className="max-w-[150px] drop-shadow md:max-w-none">
          {title}
        </Title>
        <div className="uppercase text-white drop-shadow md:text-lg lg:text-xl">{subtitle}</div>
      </div>
      <div className="gallery-info-card__button">
        <Button
          path={button?.path}
          color={button?.color || 'green'}
          onClick={button?.onClick}
          filled
          className="inline-block py-3 px-12 text-center text-base hover:!bg-white hover:!bg-opacity-80"
        >
          {button?.text}
        </Button>
      </div>
    </div>
  );
};
export default GalleryInfoCard;
