import React from 'react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black z-100">
      <img src="https://openclipart.org/download/321033/bullversusbear.svg" alt="Loading" className="w-1/2 max-w-xs mb-4" />
      <p className="text-4xl font-bold">Loading...</p>
    </div>
  );
}
