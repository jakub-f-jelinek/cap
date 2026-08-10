import glassTexture from "@/assets/glass/glass-24.png";
import { crashSlides } from "@/data/crashSlides.js";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CrashSlider.scss";

export default function CrashSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = crashSlides[activeIndex];

  return (
    <section id="chovani" className="crash-slider section">
      <div className="container crash-slider__layout">
        <div className="crash-slider__swiper-wrap">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            watchSlidesProgress={true}
            slideToClickedSlide={true}
            loop={true}
            speed={600}
            slidesPerView={1.35}
            coverflowEffect={{
              rotate: 5,
              stretch: 24,
              depth: 120,
              scale: 1,
              modifier: 1.65,
              slideShadows: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.55,
                stretch: 54,
              },
              960: {
                slidesPerView: 2.2,
                stretch: 54,
              },
              1200: {
                slidesPerView: 2.45,
                stretch: 54,
              },
            }}
            modules={[EffectCoverflow, Pagination]}
            pagination={{ clickable: true, el: ".crash-slider__pagination" }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="crash-slider__swiper"
          >
            {crashSlides.map((slide) => (
              <SwiperSlide key={slide.title} className="crash-slider__slide">
                <div className="crash-slider__card">
                  <img
                    src={glassTexture}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                  />
                  <div className="crash-slider__card-scrim" />
                </div>
                <p className="crash-slider__card-title">{slide.title}</p>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="crash-slider__pagination" />
        </div>

        <div className="crash-slider__info">
          <p className="section-eyebrow">{active.title}</p>
          <span className="section-rule" />
          <p className="crash-slider__detail">{active.detail}</p>
        </div>
      </div>
    </section>
  );
}
