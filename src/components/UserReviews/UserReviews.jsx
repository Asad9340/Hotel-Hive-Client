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
      console.log(res.data);
      setReview(res.data);
    });
  }, []);
  return (
    <div className="space-y-8 lg:space-y-12">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold text-center">
        User Reviews
      </h2>
      <div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation, Autoplay]}
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
      </div>
    </div>
  );
}

export default UserReviews;
