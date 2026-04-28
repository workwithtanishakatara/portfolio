"use client";

import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    window.location.replace("https://tanishakatara.sanity.studio/");
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center p-6 text-center">
      <p>Redirecting to the Sanity Studio...</p>
    </main>
  );
};

export default page;
