import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function MyBookings() {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const [myBooking, setMyBooking] = useState([]);
  const [control, setControl] = useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/my-booking?email=${email}`).then(res => {
      setMyBooking(res.data);
    });
  }, [email, control]);

  const handleCancelBooking = (token, id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        let status = true;
        fetch(`http://localhost:5000/rooms/update/${token}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ status }),
        })
          .then(res => res.json())
          .then(data => {
            if (data.modifiedCount) {
              fetch(`http://localhost:5000/my-booking/${id}`, {
                method: 'DELETE',
              })
                .then(res => res.json())
                .then(data => {
                  console.log(data);
                  if (data.deletedCount > 0) {
                    setControl(!control);
                    Swal.fire({
                      title: 'Deleted!',
                      text: 'Your file has been deleted.',
                      icon: 'success',
                    });
                  }
                });
            }
          });
      }
    });
  };
  const handleDateUpdate = async id => {
    const { value: date } = await Swal.fire({
      title: 'select departure date',
      input: 'date',
      didOpen: () => {
        const today = new Date().toISOString();
        Swal.getInput().min = today.split('T')[0];
      },
    });
    if (date) {
      fetch(`http://localhost:5000/my-booking/update/${id}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ date }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.modifiedCount) {
            setControl(!control);
            Swal.fire('Updated New Date', date);
          }
        });
    }
  };

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
                <th>Rating</th>
                <th>Booking Date</th>
                <th>Review</th>
                <th>Update</th>
                <th>Booking</th>
              </tr>
            </thead>
            <tbody>
              {myBooking.map((item, index) => (
                <tr key={item._id}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.rating}</td>
                  <td>{item.date}</td>
                  <td>
                    <Link to={`/review/${item._id}`}>
                      <button className="px-3 py-2 bg-red-700 rounded-md text-white">
                        Review
                      </button>
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDateUpdate(item._id)}
                      className="px-3 py-2 bg-red-700 rounded-md text-white"
                    >
                      Update Date
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleCancelBooking(item?.token, item?._id)
                      }
                      className="px-3 py-2 bg-red-700 rounded-md text-white"
                    >
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