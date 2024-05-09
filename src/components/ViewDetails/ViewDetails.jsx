import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillDollarCircle } from 'react-icons/ai';
function ViewDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/rooms/${id}`).then(res => {
      console.log(res.data);
      setRoom(res.data);
    });
  }, [id]);
  return (
    <div className="mt-8 md:mt-12   grid gap-4 grid-cols-1 lg:grid-cols-12">
      <div className="col-span-8 space-y-4">
        <div>
          <h2 className="text-3xl font-semibold">{room.title}</h2>
          <p className="text-sm mb-3">
            Naya Paltan, V.I.P Road, Dhaka-1000, 1000 Dhaka, Bangladesh
          </p>
          <img
            src={room.roomImage}
            className="rounded-lg w-full h-[400px] lg:h-[500px]"
            alt=""
          />
        </div>
        <div className="space-y-3">
          <p>
            Description: {room.roomDescription}
            {room.roomDescription}
            {room.roomDescription}
            {room.roomDescription}
            {room.roomDescription}
          </p>
          <p>
            <span className="bg-[#003B95] text-white p-2 rounded-t-md rounded-br-md">
              {room.rating}
              {'  '}
            </span>
          </p>
        </div>
      </div>
      <div className="col-span-4 pt-8 mt-8 md:mt-10 rounded-lg">
        <div className="border w-full flex flex-col  items-center p-4 rounded-lg">
          <h2 className="text-center text-xl font-semibold">
            Property highlights
          </h2>
          <p className="flex gap-1 items-center text-base">
            Cost: <AiFillDollarCircle /> {room.pricePerNight} per Night
          </p>
          <p className="flex gap-1 items-center text-base">
            Room Size: {room.roomSize}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
