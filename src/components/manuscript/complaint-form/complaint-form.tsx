import React, { useState } from "react";
import axios from "axios";
import { encryptHandler } from "./encrypt-decrypt";

const complaintCategories = [
  {
    title: "FRAUD",
    subcategories: ["Unauthorized transactions (WEB/POS)", "Phishing or identity theft", "Suspicious activity"],
  },
  {
    title: "CARD ISSUES",
    subcategories: ["Card not working", "Card lost or stolen", "Failed transactions"],
  },
  {
    title: "GENERAL INQUIRIES",
    subcategories: ["Account balance issues", "Branch experience complaints", "Delayed response to queries"],
  },
];

const ComplaintForm: React.FC = () => {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [complaintText, setComplaintText] = useState("");

  const url = "https://online-complaint-form-api.sterling.ng/api/Complaint";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !subcategory || !accountNumber || !phoneNumber || !email || !complaintText) {
      alert("Please fill all required fields.");
      return;
    }
  
    console.log("Complaint submitted:", { category, subcategory, accountNumber, phoneNumber, email, complaintText });
  
    try {
      // Removed encryption and sent the data directly
      axios.post(url, { category, subcategory, accountNumber, phoneNumber, email, complaintText })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setCategory("");
      setSubcategory("");
      setAccountNumber("");
      setPhoneNumber("");
      setEmail("");
      setComplaintText("");
    }
  };
  



  return (
    <div className="mx-auto bg-white p-6 rounded-md shadow-md">
      {/* Header Section */}
      <div className="mb-6 md:flex md:items-center md:justify-between">
        <div className="text-left">
          <h1 className="text-2xl font-bold text-gray-800">
            How can we <span className="text-red-500">help</span> you?
          </h1>
          <p className="text-gray-600">
            Have an issue you’d like resolved? We’d love to hear from you.
          </p>
        </div>
        <img
          src="complaint-form-heading.png"
          alt="Customer Support"
          className="hidden md:block w-1/3 rounded-md"
        />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Complaint Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Complaint Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setSubcategory(""); // Reset subcategory when category changes
            }}
            className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select a category</option>
            {complaintCategories.map((cat) => (
              <option key={cat.title} value={cat.title}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        {/* Subcategory */}
        {category && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subcategory <span className="text-red-500">*</span>
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a subcategory</option>
              {complaintCategories
                .find((cat) => cat.title === category)
                ?.subcategories.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>
        )}

        {/* Account Number */}
        {subcategory && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="10-Digit Sterling Account Number"
              maxLength={10}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* Phone Number */}
        {accountNumber && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* Email */}
        {phoneNumber && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* Complaint Text */}
        {email && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complaint Details <span className="text-red-500">*</span>
            </label>
            <textarea
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              placeholder="Describe your complaint"
              rows={4}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
