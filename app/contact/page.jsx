import ContactForm from "@/components/contact/ContactForm";
import Testimonials from "@/components/Testimonials";
import { fetchData } from "@/lib/FetchData";
import React from "react";

export const metadata = {
  title: "Contact",
  description:
    "Contact Tanisha Katara about AI deployment, product strategy, blockchain infrastructure, research, and mechanism design.",
};

const page = async () => {
  const data = await fetchData(
    "https://9wlw9jiw.api.sanity.io/v2022-03-07/data/query/production?query=*%5B_type+%3D%3D+%22contactPage%22%5D%5B0%5D"
  );

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="max-w-[1200px] flex-col flex justify-center items-center gap-10 w-full py-20 p-5">
        <ContactForm
          data={{
            ...data,
            contactTitle: "Discuss a difficult technical or product problem",
            contactDescription:
              "Share the context, the decision you need to make, and what is currently getting in the way. Relevant work includes AI deployment, product strategy, blockchain infrastructure, governance, and mechanism design.",
          }}
        />
        <Testimonials data={data} />
      </div>
    </main>
  );
};

export default page;
