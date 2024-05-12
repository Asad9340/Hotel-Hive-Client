import { useEffect } from "react";
import Banner from "../../components/Banner/Banner";
import FeaturedRooms from "../../components/FeatuedRooms/FeaturedRooms";
import MyMap from "../../components/MyMap/MyMap";
import Newsletter from "../../components/Newsletter/Newsletter";
import UserReviews from "../../components/UserReviews/UserReviews";
import Swal from "sweetalert2";

function Homepage() {
  useEffect(() => {
Swal.fire({
  imageUrl:
    'https://i.postimg.cc/WpChNVV6/pngtree-up-to-20-off-price-tag-design-png-image-6429660.png',
  imageHeight: 300,
  imageWidth: 400,
  imageAlt: 'A Special Offer Image',
});
  },[])
  return (
    <div className="my-8 md:my-10 lg:my-14 space-y-8 md:space-y-12 lg:space-y-16">
      <Banner />
      <FeaturedRooms />
      <UserReviews />
      <MyMap />
      <Newsletter />
    </div>
  );
}

export default Homepage