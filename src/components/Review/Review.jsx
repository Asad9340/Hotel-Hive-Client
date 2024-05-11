import { useContext } from 'react';
import { AuthContext } from '../../Firebase/AuthProvider';

function Review() {
  const { user } = useContext(AuthContext);
  const handleReview = e => {
    e.preventDefault();
    const rating = e.target.rating.value;
    const ratingDescription = e.target.ratingDescription.value;
    console.log(rating, ratingDescription);
  };
  return (
    <div className="my-8 md:my-12">
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
            min="0"
            max="5"
            step="0.1"
            className="input input-bordered input-accent w-full"
          />
        </div>
        <div>
          <label htmlFor="date">Date</label>
          <textarea
            placeholder="Bio"
            required
            name="ratingDescription"
            className="textarea textarea-bordered textarea-md w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-800 w-full py-2 rounded-md text-white active:bg-green-900 hover:bg-green-700"
        >
          Review
        </button>
      </form>
    </div>
  );
}

export default Review;
