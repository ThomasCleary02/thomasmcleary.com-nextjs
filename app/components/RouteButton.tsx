import Link from 'next/link';

interface RouteButtonProps {
  text: string;
  route: string;
}

export default function RouteButton({ text, route }: RouteButtonProps) {
  return (
    <Link
      href={route}
      className="bg-primaryBlue text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
    >
      {text}
    </Link>
  );
}