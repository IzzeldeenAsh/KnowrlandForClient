// app/not-found.tsx

import Link from "next/link";
import Image from "next/image";

export default function notFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4">
      <div className="max-w-md text-center">
        <Image
          src="/images/fancy-404-illustration.png"
          alt="Not Found Illustration"
          width={300}
          height={300}
          className="mx-auto"
        />
        <h1 className="mt-6 text-5xl font-extrabold text-gray-800">404</h1>
        <p className="mt-4 text-xl text-gray-600">
          Oops! It seems the knowledge you're looking for is no longer available.
        </p>
        <p className="mt-2 text-gray-500">
          Perhaps you can find something else or go back home.
        </p>
        <Link href="/" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Go Home
        </Link>
      </div>
    </div>
  );
}
