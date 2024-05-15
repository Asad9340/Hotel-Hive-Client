import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillDollarCircle } from 'react-icons/ai';
import { AuthContext } from './../../Firebase/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import Spinner from '../Spinner/Spinner';
function ViewDetails() {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const [room, setRoom] = useState([]);
  const [control, setControl] = useState(false);
  const [minDate, setMinDate] = useState('');
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios.get(`https://hotel-hive-server.vercel.app/rooms/${id}`, {withCredentials:true}).then(res => {
      setRoom(res.data);
    });
  }, [id, control]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;
    setMinDate(todayString);
  }, []);

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
              Coast: ${room?.pricePerNight} tk per night <br />
              Area: ${room?.roomSize} <br />
              Expected Date: ${date}
  `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm Booking',
    }).then(result => {
      if (result.isConfirmed) {
        fetch('https://hotel-hive-server.vercel.app/booking', {
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

        fetch(
          `https://hotel-hive-server.vercel.app/rooms/update/${room?._id}`,
          {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({ status }),
          }
        )
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              setControl(!control);
            }
          });
      }
    });
  };
  useEffect(() => {
    axios.get(`https://hotel-hive-server.vercel.app/review/${id}`).then(res => {
      setReview(res.data);
    });
  }, [id]);

  return (
    <div>
      <Helmet>
        <title>View Details</title>
      </Helmet>
      {loading ? (
        <Spinner/>
      ) : (
        <>
          <div className="mt-8 md:mt-12 mx-2  grid lg:gap-6 grid-cols-1 lg:grid-cols-12">
            <div className="col-span-8 space-y-4">
              <div>
                <h2 className="text-3xl font-semibold">{room.title}</h2>
                <p className="text-sm mb-3">
                  Naya Paltan, V.I.P Road, Dhaka-1000, 1000 Dhaka, Bangladesh
                </p>
                <div className="relative">
                  <img
                    src={room.roomImage}
                    className="rounded-lg w-full h-[300px] md:h-[350px] lg:h-[450px]"
                    alt=""
                  />
                  <p className="absolute top-10 left-0 bg-[#008234] text-white rounded-r-lg font-semibold p-4 ">
                    {room.specialOffers}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <p>
                  <span className='font-semibold text-black'>Description:</span> {room.roomDescription}
                  {room.roomDescription}
                  {room.roomDescription}
                  {room.roomDescription}
                </p>
              </div>
            </div>
            <div className="col-span-4 pt-8 mt-8 w-full md:mt-10 rounded-lg">
              <div className="border border-gray-400 w-full flex flex-col  items-center p-4 rounded-lg">
                <h2 className="text-center text-2xl font-semibold">
                  Property highlights
                </h2>
                <hr className="border px-4 my-2 w-full border-gray-500" />
                <div>
                  <p className="flex gap-1 items-end  text-lg font-semibold">
                    Cost:{' '}
                    <span className="text-3xl flex items-center font-extrabold lg:font-black">
                      <AiFillDollarCircle /> {room.pricePerNight}
                    </span>{' '}
                    per Night
                  </p>
                  <p className="flex gap-1 items-center text-lg font-semibold">
                    Room Size: {room.roomSize}
                  </p>
                  <p className="flex gap-1 items-center text-lg font-semibold">
                    Room Availability:{' '}
                    {room.availability ? 'Available' : 'Unavailable'}
                  </p>
                </div>
              </div>
              <div className="mt-8 mx-3 md:mx-4 lg:mx-6">
                <form onSubmit={handleBookNow} className="space-y-3">
                  <div>
                    <label htmlFor="text">Name: </label>
                    <input
                      type="text"
                      name="name"
                      disabled
                      defaultValue={user?.displayName}
                      placeholder="Type Your Name"
                      className="input input-bordered input-accent w-full"
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
                      className="input input-bordered input-accent w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      name="date"
                      min={minDate}
                      required
                      placeholder="Type here"
                      className="input input-bordered input-accent w-full"
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
          <div>
            <h2 className="text-2xl font-semibold mt-4 text-center md:text-start">Reviews</h2>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 mx-2">
              {review?.length ? (
                review.map(item => (
                  <div
                    key={item._id}
                    className="p-5 border border-gray-300 bg-gray-100 rounded-lg space-y-3"
                  >
                    <p>Rating: {item.rating}</p>
                    <p>Description: {item.ratingDescription}</p> <hr className='border border-gray-400'/>
                    <p className="text-md">{item.username}</p>
                    <small>Customer</small>
                  </div>
                ))
              ) : (
                <h2 className="border border-gray-700 p-5 my-3 rounded-lg">
                  Currently, there are no reviews for this room at our hotel. We
                  appreciate your interest and welcome any feedback you may
                  have.
                </h2>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewDetails;
