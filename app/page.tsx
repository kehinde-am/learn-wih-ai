import Link from "next/link";
import { IoSchoolOutline } from "react-icons/io5";

export default function Home() {
  return (
    <div className="grid min-h-screen w-full grid-cols-5">
      <div className="col-span-5 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 px-3 sm:px-0">
          <div className="m-3 rounded-full border-4 border-black p-5">
            <IoSchoolOutline className="h-16 w-16" />
          </div>
          <h1 className="py-3 text-3xl font-light sm:text-4xl">
            Welcome to Learn AI!
          </h1>
          <div className=""></div>
          <div className="flex w-full gap-5 sm:gap-6">
            <Link href="/signin" className="btn w-full text-center">
              Sign in
            </Link>
            <Link href="/signup" className="btn w-full text-center">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
