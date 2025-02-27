"use client";

import SubsTableItem from "@/components/AdminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    const res = await axios.get("/api/email");
    setEmails(res.data.emails); //trả về một đối tượng JSON với thuộc tính emails
  };

  const deleteEmail = async (mongoId) => {
    const res = await axios.delete("/api/email", {
      params: { id: mongoId },
    });
    if (res.data.success) {
      toast.success(res.data.msg);
      fetchEmails();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 p-5 sm:pt-12 sm:pl-16">
      <h1>All subscription</h1>
      <div className="relative max-w-[600px] h-[80dvh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {emails.map((item, index) => {
              return (
                <SubsTableItem
                  key={index}
                  mongoId={item._id}
                  email={item.email}
                  date={item.date}
                  deleteEmail={deleteEmail}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
