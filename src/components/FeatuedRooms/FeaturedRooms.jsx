import { Button } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function FeaturedRooms() {
  const [featuredRoom, setFeaturedRoom] = useState([]);
  useEffect(() => {
    axios.get(`https://hotel-hive-server.vercel.app/rooms`).then(res => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 p-2 md:gap-4  rounded-lg">
          {featuredRoom ? (
            featuredRoom.map(room => (
              <div key={room._id} className="h-full">
                <div className="space-y-2 my-2 h-full flex flex-col justify-between border border-gray-400 p-3 md:p-4 rounded-lg">
                  <div className="relative">
                    <Link to={`/rooms/${room._id}`} className="cursor-pointer">
                      <img
                        className="rounded-lg w-full h-[250px]"
                        src={room?.roomImage}
                        alt=""
                      />
                    </Link>
                    <p className="absolute top-8 left-0 z-50 bg-[#003B95] px-3 py-1 rounded-full text-white -rotate-45 ">
                      {room.availability ? 'Available' : 'Unavailable'}
                    </p>
                  </div>
                  <h2 data-aos="fade-up" className="text-xl font-semibold">
                    {room.title}
                  </h2>
                  <p data-aos="fade-up" className="text-sm mb-2">
                    Hotel in Dhaka
                  </p>
                  <div className="flex justify-between gap-2">
                    <div className="flex gap-2 my-2">
                      <p>
                        <span
                          data-aos="fade-up"
                          className="bg-[#003B95] text-white p-2 rounded-t-md rounded-br-md"
                        >
                          {room.rating}
                        </span>
                      </p>
                      <p data-aos="fade-up" className="font-semibold">
                        {room.rating > 4.6
                          ? 'Wonderful'
                          : room.rating > 4.4
                          ? 'Very Good'
                          : 'Bad'}
                      </p>
                    </div>
                    <div>
                      <p
                        data-aos="fade-up"
                        className="mt-4 font-semibold hover:underline"
                      >
                        {room?.reviews?.length} Reviews
                      </p>
                    </div>
                  </div>
                  <div className="pb-3">
                    <h3 data-aos="fade-up" className="text-lg font-semibold">
                      Price:{' '}
                      <span className="text-3xl font-extrabold">
                        {room?.pricePerNight} tk
                      </span>{' '}
                      <span className="text-sm">Per Night</span>
                    </h3>
                  </div>
                  <Link to={`/rooms/${room._id}`}>
                    <Button
                      data-aos="fade-up"
                      className="w-full cursor-pointer"
                      color="green"
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default FeaturedRooms;
