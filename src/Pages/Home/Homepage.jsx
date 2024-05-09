import Banner from "../../components/Banner/Banner";
import FeaturedRooms from "../../components/FeatuedRooms/FeaturedRooms";
import Map from "../../components/Map/Map";
import Newsletter from "../../components/Newsletter/Newsletter";
import UserReviews from "../../components/UserReviews/UserReviews";

function Homepage() {
  return (
    <div className="my-8 md:my-10 lg:my-14 space-y-8 md:space-y-12 lg:space-y-16">
      <Banner />
      <Map />
      <Newsletter />
      <FeaturedRooms />
      <UserReviews/>
    </div>
  );
}

export default Homepage