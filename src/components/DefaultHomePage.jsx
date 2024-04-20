import { Link } from "react-router-dom";

const DefaultHomePage = () => {
  return (
    <div className="h-[200px] w-[500px] flex flex-col justify-around items-center  ">
      <h1>WELCOME TO EQUIZ</h1>
      <div className="w-full flex justify-around">
        <Link
          to="/auth/login"
          relative="path"
          className="text-gray-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-indigo-900/50 hover:text-white"
        >
          <span>LOGIN</span>
        </Link>
        <Link
          to="/auth/register"
          relative="path"
          className="text-gray-800  font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-indigo-900/50 hover:text-white"
        >
          <span>REGISTER</span>
        </Link>
      </div>
    </div>
  );
};

export default DefaultHomePage;
