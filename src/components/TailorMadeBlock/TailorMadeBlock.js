import SectionTitle from 'components/SectionTitle';
import SectionSubtitle from 'components/SectionSubtitle';
import Button from 'components/Button';

const TailorMadeBlock = ({ image, content }) => {
  const imageUpdated = image ?? {};
  const {
    sourceUrl = '/images/default_image.png',
    altText = 'default image',
    srcSet = '',
    mediaDetails = {},
  } = imageUpdated;
  const { height = 1500, width = 1500 } = mediaDetails;
  const { title, subtitle, button } = content;
  return (
    <div className="tailor-made-block | relative flex h-[350px] items-center justify-center overflow-hidden md:h-[480px] lg:h-[550px]">
      <div className="tailor-made-block__bgImage | absolute top-0 left-0 -z-10 h-full w-full">
        <img
          src={sourceUrl || '/images/default_image.png'}
          alt={altText}
          srcSet={srcSet}
          height={height}
          width={width}
          sizes="100vw"
          loading="lazy"
          onContextMenu={(e) => e.preventDefault()}
          className="h-full w-full scale-110 object-cover blur-sm"
        />
        <div className="tailor-made-block__bgImage__overlay absolute top-0 left-0 h-full w-full bg-black opacity-25"></div>
      </div>
      <div className="tailor-made-block__content | w-full p-8 md:w-[650px] md:p-0 lg:w-[850px]">
        <div className="tailor-made-block__title | mb-4">
          <SectionTitle className="w-11/12 text-white">{title}</SectionTitle>
        </div>
        <div className="tailor-made-block__subtitle | mb-8">
          <SectionSubtitle className="ml-auto w-8/12 text-right text-white md:w-7/12">{subtitle}</SectionSubtitle>
        </div>
        <div className="tailor-made-block__button">
          <Button color="green" filled path="/contact" className="mx-auto block w-fit">
            {button}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default TailorMadeBlock;
