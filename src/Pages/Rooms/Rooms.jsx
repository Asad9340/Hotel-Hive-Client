import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/rooms').then(res => {
      setRooms(res.data);
    });
  }, []);
  return (
    <div className="mt-8 ">
      <h2 className="text-center text-3xl font-semibold">
        Available Rooms: {rooms?.length}
      </h2>
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
                  {room.availability ? 'Available' : 'Not Available'}
                </p>
              </div>
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p className="text-sm mb-3">Hotel in Dhaka</p>
              <div className="flex items-center gap-2">
                <p>
                  <span className="bg-[#003B95] text-white p-2 rounded-t-md rounded-br-md">
                    {room.rating}
                    {'  '}
                  </span>
                </p>
                <p>
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
