import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")); // Assume token is stored after login
      const response = await axios.get("http://localhost:3000/invoices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInvoices(response.data);
    } catch (err) {
      setError("Failed to fetch invoices. Check authentication.");
    }
  };

  return (
    <div className="p-3 m-3 ">
      <div className="flex gap-6">
        <img
          src="https://img.freepik.com/free-vector/invoice-concept-illustration_114360-2322.jpg"
          className="w-[30%]"
        />
        <table className="border border-gray-300 shadow-lg w-[65%]">
          <caption className="font-bold text-3xl text-center m-3">
            Your Invoices
          </caption>
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                ID
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Invoice Date
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Invoice No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Invoice Amount
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Supplier Code
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                PO No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Supplier GST Details
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Invoice Details
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {invoice.id}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {invoice.invoice_date}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {invoice.invoice_no}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {invoice.invoice_amount}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {invoice.supplier_code}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {invoice.po_no}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {invoice.supplier_gst_details}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <button className="p-2 bg-blue-500 text-sm text-white my-2 rounded-lg">
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
