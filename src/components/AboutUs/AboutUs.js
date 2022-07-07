import SectionSubtitle from 'components/SectionSubtitle';
import SectionTitle from 'components/SectionTitle';
import { getMediaQueries } from 'lib/responsive';

const AboutUs = ({ images, content }) => {
  const { main: mainImage, secondary: secondaryImage } = images;
  const { intro, title, description } = content;
  const { md, lg } = getMediaQueries();
  return (
    <div className="about-us | mx-auto max-w-[1366px] px-8 md:grid md:grid-cols-2 md:items-center md:px-0">
      <div className="about-us__images | relative mb-8 md:mb-0">
        <div className="about-us__images__main | aspect-square w-10/12 max-w-[600px]">
          <img
            src={mainImage.sourceUrl}
            alt={mainImage.altText}
            srcSet={mainImage.srcSet}
            height={mainImage.mediaDetails.height}
            width={mainImage.mediaDetails.width}
            sizes={`${lg} 600px, ${md} 400px, 70vw`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="about-us__images__secondary | absolute right-0 top-1/2 aspect-[120/186] w-2/5 max-w-[275px] -translate-y-1/2">
          <img
            src={secondaryImage.sourceUrl}
            alt={secondaryImage.altText}
            srcSet={secondaryImage.srcSet}
            height={secondaryImage.mediaDetails.height}
            width={secondaryImage.mediaDetails.width}
            sizes={`${lg} 275px, ${md} 200px, 35vw`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex flex-col items-end justify-between md:px-20">
        <div className="about-us__content | mb-8">
          <div className="about-us__content__intro | mb-2 text-right md:mb-4 md:text-left">
            <SectionSubtitle>{intro}</SectionSubtitle>
          </div>
          <div className="about-us__content__title | mb-8 text-right md:mb-12 md:text-left">
            <SectionTitle color="lightblue">{title}</SectionTitle>
          </div>
          <div className="about-us__content__text | md:hidden lg:block">
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
        <div className="about-us__corporate | space-x-4  md:hidden lg:block">
          <span>We are part of:</span>
          <div className="colourful-peru__logo | inline-block">
            <a
              href="https://colourfulperu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[120px] md:w-[150px]"
            >
              <img
                src="https://admin.colourfulbirding.com/wp-content/uploads/images/colourful-footer-logo.png"
                alt="Colourful Peru"
                width={150}
                height={55}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="description-tablet | col-start-1 col-end-3 mt-12 hidden px-8 md:block lg:hidden">
        <div className="about-us__content__text">
          <p dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="about-us__corporate | space-x-4">
          <span>We are part of:</span>
          <div className="colourful-peru__logo | inline-block">
            <a
              href="https://colourfulperu.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[120px] md:w-[150px]"
            >
              <img
                src="https://admin.colourfulbirding.com/wp-content/uploads/images/colourful-footer-logo.png"
                alt="Colourful Peru"
                width={150}
                height={55}
                loading="lazy"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
