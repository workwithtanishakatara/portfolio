"use client";

import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { Dialog, DialogContent } from "@/components/ui/Dialog";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

const ContactForm = ({ data }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const formData = new FormData(event.target);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setIsSubmitting(false);
      setErrorMessage("Contact form is not configured yet. Please try again soon.");
      return;
    }

    formData.append("access_key", accessKey);
    formData.append("subject", "New portfolio contact submission");
    formData.append("from_name", "tanishakatara.eth.limo");
    formData.append("replyto", formData.get("email"));
    formData.append("botcheck", "");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        throw new Error(responseData.message || `response status: ${response.status}`);
      }

      event.target.reset();
      setOpen(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try resubmitting the form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full justify-center items-center flex flex-col">
      <div className="w-full flex flex-col gap-10 lg:gap-5 lg:flex-row justify-between items-start">
        <div className="w-full space-y-5">
          <p className="text-3xl font-semibold">{data.contactTitle}</p>
          <p className="max-w-[450px]">
            {data.contactDescription}
          </p>
          
        </div>
        <div className="w-full">
          <form
            onSubmit={handleSubmit}
            style={{
              opacity: isSubmitting ? 0.5 : 1,
            }}
            className="flex flex-col gap-1"
          >
            <label>Name</label>
            <input
              disabled={isSubmitting}
              name="name"
              className="bg-slate-100 border border-slate-300/70 p-3 rounded-xl"
              type="text"
              required
            />
            <label>Email</label>
            <input
              disabled={isSubmitting}
              name="email"
              className="bg-slate-100 border border-slate-300/70 p-3 rounded-xl"
              type="email"
              required
            />
            <label>Company</label>
            <input
              disabled={isSubmitting}
              name="company"
              className="bg-slate-100 border border-slate-300/70 p-3 rounded-xl"
              type="text"
              required
            />
            <label>Message</label>
            <textarea
              disabled={isSubmitting}
              name="message"
              rows={10}
              className="bg-slate-100 border border-slate-300/70 !resize-none p-3 rounded-xl"
              required
            />
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex="-1"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-black mt-2 hover:bg-black/70 text-white p-3 rounded-xl"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            {errorMessage ? (
              <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
            ) : null}
          </form>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent
          onClick={() => setOpen(false)}
          onPointerDownOutside={() => setOpen(false)}
          className="bg-white"
        >
          <div className="flex flex-col w-full gap-5 py-10 justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="relative size-16 shadow-xl flex justify-center items-center rounded-full bg-green-500">
                <MdDone color="#fff" width={20} size={40} />
              </div>
              <p className="text-3xl font-semibold">Submission Successful!</p>
            </div>
            <div className="">
              <p className="text-center text-sm text-neutral-500">
                Your message has been sent successfully. We appreciate you
                reaching out. We will be in touch with you shortly.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactForm;
