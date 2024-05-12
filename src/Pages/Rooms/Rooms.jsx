import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet';
// import { Option, Select } from '@material-tailwind/react';
AOS.init();

function Rooms() {
  const [rooms, setRooms] = useState([]);
  // const [filter, setFilter] = useState('');
  //  const handleAllFilter = () => {
  //    const value = 2000;
  //    setFilter(value);
  //    console.log(filter);
  //  };
  useEffect(() => {
    axios.get(`http://localhost:5000/rooms`).then(res => {
      setRooms(res.data);
    });
  }, []);

  return (
    <div className="mt-8 space-y-3 ">
      <Helmet>
        <title>Rooms</title>
      </Helmet>
      <h2 className="text-center text-3xl font-semibold">
        Available Rooms: {rooms?.length}
      </h2>
      {/* <div className="flex justify-center">
        <div className="w-72 flex">
          <Select label="Select Filter Option">
            <Option onClick={handleAllFilter}>Pirce 0 to 2000</Option>
            <Option >Yes</Option>
            <Option >No</Option>
          </Select>
        </div>
      </div> */}
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
