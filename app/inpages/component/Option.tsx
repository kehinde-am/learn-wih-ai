import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Import the arrow icon from lucide-react

const Option = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="relative flex flex-col justify-center items-center p-4 md:p-8 bg-white w-full h-[90vh] max-w-[1200px] max-h-[800px] shadow-lg border-black rounded-md">
        <Link href="/">
          <div className="absolute top-4 left-4 md:top-8 md:left-8 bg-gray-300 p-2 rounded-md shadow-lg cursor-pointer">
            <ArrowLeft className="h-5 w-5" /> {/* Add the arrow icon here */}
          </div>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-2/3 h-2/3">
          {/* Link each option to the dashboard */}
          <Link href="/dashboard">
            <div className="bg-gray-200 p-4 sm:p-6 rounded-md shadow-lg flex items-center justify-center text-center cursor-pointer hover:bg-gray-300 transition">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Javascript
              </h2>
            </div>
          </Link>

          <Link href="/dashboard">
            <div className="bg-gray-200 p-4 sm:p-6 rounded-md shadow-lg flex items-center justify-center text-center cursor-pointer hover:bg-gray-300 transition">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Python
              </h2>
            </div>
          </Link>

          <Link href="/dashboard">
            <div className="bg-gray-200 p-4 sm:p-6 rounded-md shadow-lg flex items-center justify-center text-center cursor-pointer hover:bg-gray-300 transition">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Advanced JavaScript
              </h2>
            </div>
          </Link>
          {/* 
          <Link href="/dashboard">
            <div className="bg-gray-200 p-4 sm:p-6 rounded-md shadow-lg flex items-center justify-center text-center cursor-pointer hover:bg-gray-300 transition">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                Java
              </h2>
            </div>
          </Link> */}
        </div>

        <Link href="/dashboard">
          <div className="absolute top-4 right-4 md:top-8 md:right-8 bg-gray-300 p-2 rounded-md shadow-lg cursor-pointer">
            <span>Skip</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Option;
