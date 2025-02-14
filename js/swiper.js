/* slider01 */
const slider01 = new Swiper('.slider01', {
  spaceBetween: 100,
  slidesPerView: 1,
  autoHeight: true,
  loop: true,
  loopAdditionalSlides: 1,

  speed: 1500,

  autoplay: {
    delay: 3000,
    stopOnLastSlide: false,
    disableOnInteraction: false,
    reverseDirection: false
  },

  effect: 'fade', 
  fadeEffect: {
    crossFade: true, 
  },

  navigation: {
    nextEl: '.main__swiper .swiper-button-next',
    prevEl: '.main__swiper .swiper-button-prev'
  },

  breakpoints: {
    slidesPerView: 1,
    1024: {
      spaceBetween: 100,
      centeredSlides: true,
      slidesPerView: 1,
    },
    1440: {
      slidesPerView: 1,
    }
  },
});

const slider02 = new Swiper('.slider02', {
	spaceBetween: 10,
	centeredSlides: true, // 両端見切れにする
	slidesPerView: 1.8,
	autoHeight: true, // スライドの高さに合わせてSwiperの高さを変える
	loop: true,	// ループする
	speed: 4000,
	allowTouchMove: false, // スワイプ無効
	autoplay: {
		delay: 0
	},
	breakpoints: {
		768: {
			slidesPerView: 3,
		},
		1024: {
			spaceBetween: 20,
			slidesPerView: 4,
		},
		1440: {
			spaceBetween: 20,
		  	slidesPerView: 4,
		}
	  },
  });

/* slider02 */
