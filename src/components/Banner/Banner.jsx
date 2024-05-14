function Banner() {
  return (
    <div>
      <div className="relative">
        <img
          className="w-full h-[350px] md:h-[580px] rounded-lg "
          src="https://i.postimg.cc/KvVnBPmL/63e0ae31497191675669041.jpg"
          alt=""
        />
        <div className="absolute top-0 bg-gradient-to-r from-[#151515] to-[#15151500]  h-full w-full rounded-xl">
          <div className="absolute top-[50%] mx-3 lg:left-20 max-w-xl transform -translate-y-[50%] space-y-4 ">
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-200 text-center">
              Welcome to HotelHive <br />
              <p className="text-center">Gateway to Hotel Booking!</p>
            </h2>
            <p className="text-gray-400 text-center text-sm md:text-base ">
              Discover a new way to book hotels with HotelHive. Experience
              seamless functionality across devices, innovative features, and
              join the hive to unlock effortless travel planning today!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
