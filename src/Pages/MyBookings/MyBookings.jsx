import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';

function MyBookings() {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [myBooking, setMyBooking] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/my-booking/${email}`).then(res => {
      console.log(res.data);
      setMyBooking(res.data);
    });
  }, [email]);

  console.log(myBooking);
  return (
    <div className="space-y-6 my-10">
      <div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold md:font-bold lg:font-extrabold text-center">
          My Booking List{' '}
        </h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Title</th>
                <th>Rating</th>
                <th>Booking Date</th>
                <th>Email</th>
                <th>Booking</th>
              </tr>
            </thead>
            <tbody>
              {myBooking.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.title}</td>
                  <td>{item.rating}</td>
                  <td>{item.date}</td>
                  <td>{item.email}</td>
                  <td>
                    <button className="px-3 py-2 bg-red-700 rounded-md text-white">
                      Cancel Booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
