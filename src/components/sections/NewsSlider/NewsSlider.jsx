import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { articles } from '@/content/articles.js'
import glassAccent from '@/assets/glass/glass-36.png'
import 'swiper/css'
import 'swiper/css/pagination'
import './NewsSlider.scss'

export default function NewsSlider() {
  return (
    <section id="aktuality" className="news-slider section">
      <img className="news-slider__glass" src={glassAccent} alt="" aria-hidden="true" loading="lazy" />

      <div className="container">
        <p className="section-eyebrow">Aktuality z našich sítí</p>
        <span className="section-rule" />

        <Swiper
          modules={[Pagination]}
          spaceBetween={24}
          slidesPerGroup={1}
          pagination={{ clickable: true, el: '.news-slider__pagination' }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="news-slider__swiper"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.slug}>
              <article className="news-card">
                <a
                  className="news-card__image"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={article.title}
                >
                  {article.image && <img src={article.image} alt={article.title} loading="lazy" />}
                </a>
                <h3 className="news-card__title">{article.title}</h3>
                <p className="news-card__date">{article.date}</p>
                <span className="section-rule" />
                <p className="news-card__excerpt">{article.excerpt}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="news-slider__pagination" />
      </div>
    </section>
  )
}
