import Banner from "../../components/Banner/Banner";
import Map from "../../components/Map/Map";
import Newsletter from "../../components/Newsletter/Newsletter";

function Homepage() {
  return (
    <div className="my-8 md:my-10 lg:my-14 space-y-8 md:space-y-12 lg:space-y-16">
      <Banner />
      <Map />
      <Newsletter/>
    </div>
  );
}

export default Homepage