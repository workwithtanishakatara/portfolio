import ContactForm from "@/components/contact/ContactForm";
import Testimonials from "@/components/Testimonials";
import { fetchData } from "@/lib/FetchData";
import React from "react";

const page = async () => {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22contactPage%22%5D%5B0%5D"
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] flex-col flex justify-center items-center gap-10 w-full py-20 p-5">
        <ContactForm data={data} />
        <Testimonials data={data} />
      </div>
    </main>
  );
};

export default page;
