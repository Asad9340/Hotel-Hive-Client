
function Banner() {
  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-[350px] md:h-[580px] rounded-lg "
          src="https://i.postimg.cc/KvVnBPmL/63e0ae31497191675669041.jpg"
          alt=""
        />
        <div className="absolute top-[50%] left-4 lg:left-20 max-w-96 transform -translate-y-[50%]  ">
          <h2 className="text-2xl md:text-4xl font-semibold text-white text-center">
            Welcome to HotelHive <br />
            <p className="text-center">Your Gateway to Modern Hotel Booking!</p>
          </h2>
          <p className="text-white">
            Discover a new way to book hotels with HotelHive. Experience
            seamless functionality across devices, innovative features, and
            unparalleled user experiences. Join the hive and unlock a world of
            effortless travel planning today!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Banner