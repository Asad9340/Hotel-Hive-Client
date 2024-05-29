import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Option, Select } from '@material-tailwind/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
import Spinner from '../../components/Spinner/Spinner';
AOS.init();

function Rooms() {
  const [selectedOption, setSelectedOption] = useState('');
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get(`https://hotel-hive-server.vercel.app/rooms`).then(res => {
      setRooms(res.data);
    });
  }, []);

  const handleAllFilter = () => {
    axios.get(`https://hotel-hive-server.vercel.app/rooms`).then(res => {
      setRooms(res.data);
    });
  };
  const handleLowFilter = () => {
    const lowValue = 0;
    const highValue = 2000;
    (async () => {
      axios
        .get(
          `https://hotel-hive-server.vercel.app/room/${lowValue}/${highValue}`
        )
        .then(res => {
          setRooms(res.data);
        });
    })();
  };

  const handleMidFilter = () => {
    const lowValue = 2001;
    const highValue = 5000;
    (async () => {
      axios
        .get(
          `https://hotel-hive-server.vercel.app/room/${lowValue}/${highValue}`
        )
        .then(res => {
          setRooms(res.data);
        });
    })();
  };
  const handleHighFilter = () => {
    const lowValue = 5001;
    const highValue = 10000000;
    (async () => {
      axios
        .get(
          `https://hotel-hive-server.vercel.app/room/${lowValue}/${highValue}`
        )
        .then(res => {
          setRooms(res.data);
        });
    })();
  };

  const handleChange = event => {
    console.log(event.target);
    setSelectedOption(event.target.value);
    if (event.target.value === 'availability') {
      const sortAvailability = rooms.sort((a, b) => {
        if (a.availability < b.availability) {
          return 1;
        }
        if (a.availability > b.availability) {
          return -1;
        }
        return 0;
      });
      setRooms(sortAvailability);
    } else if (event.target.value === 'price') {
      const sortPrice = rooms.sort((a, b) => b.price - a.price);
      setRooms(sortPrice);
    } else if (event.target.value === 'rating') {
      const sortRating = rooms.sort((a, b) => b.rating - a.rating);
      setRooms(sortRating);
    }
  };

  return (
    <>
      {rooms ? (
        <div className="mt-8 space-y-3 ">
          <Helmet>
            <title>Rooms</title>
          </Helmet>
          <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-semibold lg:font-bold font-lato">
            Available Rooms
          </h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="w-full px-4">
              <label
                className="  block  text-blueGray-600 text-lg font-bold mb-2"
                htmlFor="grid-password"
              >
                Filter By Price
              </label>
              <Select label="Select Filter Option">
                <Option onClick={handleAllFilter}>All</Option>
                <Option onClick={handleLowFilter}>Price 0 to 2000</Option>
                <Option onClick={handleMidFilter}>Price 2001 to 5000</Option>
                <Option onClick={handleHighFilter}>Price 5001 to Max</Option>
              </Select>
            </div>
            <div className="w-full px-4">
              <label
                className="  block  text-blueGray-600 text-lg font-bold mb-2"
                htmlFor="grid-password"
              >
                Sort By
              </label>
              <select
                value={selectedOption}
                onChange={handleChange}
                className="border px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                name="subcategory_name"
                id=""
              >
                <option value="">Select an option</option>
                <option value="availability">Availability</option>
                <option value="rating">Rating</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 p-4  rounded-lg">
            {rooms.map(room => (
              <div
                key={room._id}
                className="border border-gray-500 hover:border-[#df9d5b] p-3 rounded-md hover:scale-105 duration-300"
              >
                <div>
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
                  <h2 data-aos="fade-up" className="text-xl font-semibold mt-2">
                    {room.title}
                  </h2>
                  <p data-aos="fade-up" className="text-sm mb-3">
                    Hotel in Dhaka
                  </p>{' '}
                  <hr className="border border-gray-300 mb-3" />
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
                        className="mt-4 font-semibold underline"
                      >
                        {room?.reviews?.length}{' '}
                        {room?.reviews?.length == 0 ||
                        room?.reviews?.length == 1
                          ? 'Review'
                          : 'Reviews'}
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
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Rooms;
