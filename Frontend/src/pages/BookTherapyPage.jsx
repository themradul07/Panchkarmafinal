import React from "react";

const BookTherapyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
        Book a Therapy Session
      </h1>

      {/* Booking Form */}
      <form className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-green-300"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-green-300"
          />
        </div>

        {/* Therapy Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Therapy Type</label>
          <select className="w-full p-2 border rounded-lg focus:ring focus:ring-green-300">
            <option>Select a therapy</option>
            <option>Panchakarma</option>
            <option>Abhyanga</option>
            <option>Shirodhara</option>
            <option>Nasya</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-green-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default BookTherapyPage;