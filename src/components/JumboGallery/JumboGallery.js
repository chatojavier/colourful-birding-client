// core version + navigation, pagination modules:
import { useState } from 'react';
import GalleryBlur from 'components/GalleryBlur';
import Gallery from 'components/Gallery';

const JumboGallery = ({ galleryDesktop, galleryMobile }) => {
  // store controlled swiper instance
  const [controlledSwiper, setControlledSwiper] = useState(null);

  return (
    <div className="jumboGallery relative w-full">
      <GalleryBlur galleryDesktop={galleryDesktop} galleryMobile={galleryMobile} control={setControlledSwiper} />
      <Gallery galleryDesktop={galleryDesktop} galleryMobile={galleryMobile} control={controlledSwiper} />
    </div>
  );
};

export default JumboGallery;
