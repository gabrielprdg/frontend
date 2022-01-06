export const nextSlide = (totalImg, slide, setSlide) => {
  if (slide === totalImg - 1) {
    setSlide(0);
  } else if (slide < totalImg) {
    setSlide(slide + 1);
  }
};

export const prevSlide = (totalImg, slide, setSlide) => {
  if (slide === 0) {
    setSlide(totalImg - 1);
  } else if (slide === totalImg - 1) {
    setSlide(0);
  }
};