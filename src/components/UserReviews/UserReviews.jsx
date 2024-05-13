import axios from 'axios';
import { useEffect, useState } from 'react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
function UserReviews() {
  const [review, setReview] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/review`).then(res => {
      setReview(res.data);
    });
  }, []);
  return (
    <div className="space-y-8 lg:space-y-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold text-center">
        User Reviews
      </h2>
      <div>
        {review?.length ? (
          <Swiper
            slidesPerView={3}
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
                <p>Rating: {item.rating}</p>
                <p>Description: {item.ratingDescription}</p> <hr />
                <p className="text-xs">{item.username}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className='text-center text-lg font-semibold mt-6'>There is now review yet...</p>
        )}
      </div>
    </div>
  );
}

export default UserReviews;
