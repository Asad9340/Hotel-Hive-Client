import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Option, Select } from '@material-tailwind/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
AOS.init();

function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/rooms`).then(res => {
      setRooms(res.data);
    });
  }, []);

  const handleAllFilter = () => {
    axios.get(`http://localhost:5000/rooms`).then(res => {
      setRooms(res.data);
    });
  };
  const handleLowFilter = () => {
    const lowValue = 0;
    const highValue = 2000;
    (async () => {
      axios
        .get(`http://localhost:5000/room/${lowValue}/${highValue}`)
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
        .get(`http://localhost:5000/room/${lowValue}/${highValue}`)
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
        .get(`http://localhost:5000/room/${lowValue}/${highValue}`)
        .then(res => {
          setRooms(res.data);
        });
    })();
  };

  return (
    <div className="mt-8 space-y-3 ">
      <Helmet>
        <title>Rooms</title>
      </Helmet>
      <h2 className="text-center text-3xl font-semibold">
        Available Rooms: {rooms?.length}
      </h2>
      <div className="w-full">
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
          <Option onClick={handleHighFilter}>Price 5001 to 10000</Option>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4  rounded-lg">
        {rooms.map(room => (
          <div key={room._id}>
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
                    {'  '}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
