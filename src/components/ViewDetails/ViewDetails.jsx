import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillDollarCircle } from 'react-icons/ai';
import { AuthContext } from './../../Firebase/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
function ViewDetails() {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [control, setControl] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/rooms/${id}`).then(res => {
      setRoom(res.data);
    });
  }, [id, control]);

  const handleBookNow = e => {
    e.preventDefault();
    const date = e.target.date.value;
    const bookingInfo = {
      name: user?.displayName,
      email: user?.email,
      date,
      status: 'Unavailable',
      image: room?.roomImage,
      title: room?.title,
      rating: room?.rating,
      area: room?.roomSize,
      token: room?._id,
    };
    Swal.fire({
      title: 'Booking Summary...',
      html: `
              <br /> Title: ${room?.title} <br />
              Rating: ${room?.rating} <br />
              Coast: ${room?.pricePerNight} <br />
              Area: ${room?.roomSize} <br />
              Exprected Date: ${date}
  `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm Booking',
    }).then(result => {
      if (result.isConfirmed) {
        fetch('http://localhost:5000/booking', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(bookingInfo),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            Swal.fire({
              title: 'Booked!',
              text: 'Your Booking has been confirmed.',
              icon: 'success',
            });
          });

        let status = !room?.availability;

        fetch(`http://localhost:5000/rooms/update/${room?._id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ status }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              setControl(!control);
            }
          });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>View Details</title>
      </Helmet>
      {loading ? (
        'Loading...'
      ) : (
        <div className="mt-8 md:mt-12   grid gap-4 grid-cols-1 lg:grid-cols-12">
          <div className="col-span-8 space-y-4">
            <div>
              <h2 className="text-3xl font-semibold">{room.title}</h2>
              <p className="text-sm mb-3">
                Naya Paltan, V.I.P Road, Dhaka-1000, 1000 Dhaka, Bangladesh
              </p>
              <div className="relative">
                <img
                  src={room.roomImage}
                  className="rounded-lg w-full h-[400px] lg:h-[500px]"
                  alt=""
                />
                <p className="absolute top-10 left-0 bg-[#008234] text-white rounded-r-lg font-semibold p-2 ">
                  {room.specialOffers}
                </p>
              </div>
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
            <div className="mt-8 mx-6">
              <form onSubmit={handleBookNow} className="space-y-3">
                <div>
                  <label htmlFor="text">Name: </label>
                  <input
                    type="text"
                    name="name"
                    disabled
                    defaultValue={user?.displayName}
                    placeholder="Type Your Name"
                    className="input input-bordered input-accent w-full max-w-xs"
                  />
                </div>
                <div>
                  <label htmlFor="text">Email: </label>
                  <input
                    type="email"
                    name="email"
                    disabled
                    defaultValue={user?.email}
                    placeholder="Type Your Name"
                    className="input input-bordered input-accent w-full max-w-xs"
                  />
                </div>
                <div>
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    placeholder="Type here"
                    className="input input-bordered input-accent w-full max-w-xs"
                  />
                </div>
                <button
                  disabled={!room?.availability}
                  type="submit"
                  className="bg-green-800 w-full py-2 rounded-md text-white active:bg-green-900 hover:bg-green-700"
                >
                  {room?.availability ? 'Book Now' : 'Unavailable'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewDetails;
