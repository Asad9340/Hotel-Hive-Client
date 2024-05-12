import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function FeaturedRooms() {
  const [featuredRoom, setFeaturedRoom] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/rooms`).then(res => {
      const data = res.data;
      const newData = data.slice(0, 6);
      setFeaturedRoom(newData);
    });
  }, []);

  return (
    <div>
      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold lg:font-extrabold text-center">
          Featured Rooms
        </h2>
        <p className="textarea-md md:text-lg text-center max-w-4xl mx-auto text-gray-700">
          Discover our featured rooms: where comfort meets style in every
          detail. Experience luxury and relaxation like never before with
          HotelHives curated selection of premium accommodations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 p-4  rounded-lg">
          {featuredRoom.map(room => (
            <div key={room._id}>
              <div className="space-y-3 my-5 border border-gray-400 p-4 rounded-lg">
                <div className="relative">
                  <Link to={`/rooms/${room._id}`} className="cursor-pointer">
                    <img
                      className="rounded-lg w-full h-[250px]"
                      src={room?.roomImage}
                      alt=""
                    />
                  </Link>
                  <p className="absolute top-8 left-0 z-50 bg-[#F57C00] px-3 py-1 rounded-full text-white -rotate-45">
                    {room.availability ? 'Available' : 'Unavailable'}
                  </p>
                </div>
                <h2 data-aos="fade-up" className="text-xl font-semibold">
                  {room.title}
                </h2>
                <p data-aos="fade-down" className="text-sm mb-3">
                  Hotel in Dhaka
                </p>
                <div className="flex items-center gap-2">
                  <p>
                    <span
                      data-aos="fade-up"
                      className="bg-[#003B95] text-white p-2 rounded-t-md rounded-br-md"
                    >
                      {room.rating}
                    </span>
                  </p>
                  <p data-aos="fade-up">
                    {room.rating > 4.6
                      ? 'Wonderful'
                      : room.rating > 4.4
                      ? 'Very Good'
                      : 'Bad'}
                  </p>
                </div>
                <p className="mt-4">{room?.reviews?.length} Reviews</p>
                <Link to={`/rooms/${room._id}`}>
                  <Button className="w-full cursor-pointer " color="green">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeaturedRooms;
