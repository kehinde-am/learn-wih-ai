"use Client";

interface GoogleProps {
  onClick: () => void;
}

const Google: React.FC<GoogleProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
  >
    Sign in with Google
  </button>
);

export default Google;
