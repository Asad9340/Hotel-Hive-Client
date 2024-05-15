import { HashLoader } from "react-spinners";

function Spinner() {
  return (
    <div className="w-full h-full flex justify-center items-center my-20">
      <HashLoader color="#000000" size={150} speedMultiplier={1} />
    </div>
  );
}

export default Spinner