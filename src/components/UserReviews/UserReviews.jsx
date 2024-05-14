import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Rating } from '@material-tailwind/react';

function UserReviews() {
  const [review, setReview] = useState([]);
  const [slidesPerView, setSlidesPerView] = useState(3);

  useEffect(() => {
    axios.get(`https://hotel-hive-server.vercel.app/review`).then(res => {
      setReview(res.data);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="space-y-8 lg:space-y-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold text-center">
        User Reviews
      </h2>
      <div>
        {review?.length ? (
          <Swiper
            slidesPerView={slidesPerView}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {review.map(item => (
              <SwiperSlide
                key={item._id}
                className="p-5 border border-gray-300 bg-gray-100 rounded-lg space-y-3"
              >
                <div className="flex items-center gap-1">
                  <p>Rating:</p>
                  <Rating className="text-xs" value={4} readonly />
                  <p>{item.rating}</p>
                </div>
                <p>Description: {item.ratingDescription}</p>
                <hr />
                <p>Timestamp: {item.timestamp}</p>
                <p className="text-xs">{item.username}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-lg font-semibold mt-6">
            There is no review yet...
          </p>
        )}
      </div>
    </div>
  );
}

export default UserReviews;
