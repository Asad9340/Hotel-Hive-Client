import { useContext, useState } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';

function Review() {
  const { user } = useContext(AuthContext);
  const { token } = useParams();
  const navigate = useNavigate();
  const [isDisabled, setDisabled] = useState(false);
  const handleReview = e => {
    e.preventDefault();
    const rating = e.target.rating.value;
    const ratingDescription = e.target.ratingDescription.value;
    const timestamp = Date.now();
    const review = {
      rating,
      ratingDescription,
      username: user?.displayName,
      timestamp,
      id: token,
    };

    fetch(`https://hotel-hive-server.vercel.app/rooms/review/${token}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ review }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount) {
          console.log('updated review');
          setDisabled(true);
        }
      });

    fetch(`https://hotel-hive-server.vercel.app/rooms/review/${token}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ review }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Added Review Successfully',
        });
        e.target.reset();
        navigate('/my-bookings');
      });
  };
  return (
    <div className="my-8 md:my-12">
      <Helmet>
        <title>Review</title>
      </Helmet>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold lg:font-bold text-center mb-6">
        Review Page
      </h2>
      <form onSubmit={handleReview} className="space-y-3 max-w-3xl mx-auto">
        <div>
          <label htmlFor="text">Username: </label>
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
          <label htmlFor="number">Rating: </label>
          <input
            type="number"
            name="rating"
            required
            placeholder="Type Your Rating"
            min="1"
            max="5"
            step="0.1"
            className="input input-bordered input-accent w-full"
          />
        </div>
        <div>
          <label htmlFor="date">Description</label>
          <textarea
            placeholder="Bio"
            required
            name="ratingDescription"
            className="textarea textarea-bordered textarea-md w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          className="bg-green-800 w-full py-2 rounded-md text-white active:bg-green-900 hover:bg-green-700"
        >
          Review
        </button>
      </form>
    </div>
  );
}

export default Review;
