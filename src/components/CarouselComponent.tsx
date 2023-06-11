'use client';

import React from 'react';
import Carousel from 'nuka-carousel';

const CarouselComponent = ({ children }: { children: React.ReactNode }) => {
  const windowWidth = React.useRef(window.innerWidth);

  return (
    <Carousel
      autoplay
      wrapAround
      withoutControls
      slidesToShow={windowWidth.current >= 450 ? 6 : 3}
      cellAlign={windowWidth.current >= 450 ? 'left' : 'center'}
    >
      {children}
    </Carousel>
  );
};

export default CarouselComponent;
