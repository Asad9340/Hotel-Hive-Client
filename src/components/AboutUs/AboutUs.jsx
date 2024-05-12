import { Helmet } from "react-helmet";

function AboutUs() {
  return (
    <div>
      <Helmet>
        <title>About Page</title>
      </Helmet>
      <div className="sm:flex items-center max-w-screen-xl">
        <div className="sm:w-1/2 p-10">
          <div className="image object-center text-center">
            <img src="https://i.imgur.com/WbQnbas.png" />
          </div>
        </div>
        <div className="sm:w-1/2 p-5">
          <div className="text">
            <span className="text-gray-500 border-b-2 border-indigo-600 uppercase">
              About us
            </span>
            <h2 className="my-4 font-bold text-3xl  sm:text-4xl ">
              About HotelHive:{' '}
              <span className="text-indigo-600">Redefining Hospitality</span>
            </h2>
            <p className="text-gray-700">
              At HotelHive, we are passionate about redefining the hotel booking
              experience. Our mission is to provide travelers with a seamless
              and enjoyable way to discover and book their perfect
              accommodations. With a focus on innovation, user-centric design,
              and unparalleled customer service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
