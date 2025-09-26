import React, { useState } from "react";
import { Bell, RefreshCw, Database, Send } from "lucide-react";

const NotificationSettings = () => {
  const [inApp, setInApp] = useState(true);
  const [sms, setSms] = useState(false);
  const [email, setEmail] = useState(true);

  return (
    <div className="flex gap-6 flex-wrap">
      {/* Notification Channels */}
      <div className="bg-white p-6 rounded-2xl shadow-sm w-80">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Bell className="w-5 h-5 text-blue-600" />
          Notification Channels
        </h2>

        {/* In-App Notifications */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 mb-3">
          <span>In-app Notifications</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={inApp}
              onChange={() => setInApp(!inApp)}
            />
            <div
              className={`w-10 h-5 rounded-full transition ${
                inApp ? "bg-black" : "bg-gray-300"
              } relative`}
            >
              <span
                className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition ${
                  inApp ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>

        {/* SMS Alerts */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-green-50 mb-3">
          <span>SMS Alerts</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={sms}
              onChange={() => setSms(!sms)}
            />
            <div
              className={`w-10 h-5 rounded-full transition ${
                sms ? "bg-black" : "bg-gray-300"
              } relative`}
            >
              <span
                className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition ${
                  sms ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50">
          <span>Email Notifications</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={email}
              onChange={() => setEmail(!email)}
            />
            <div
              className={`w-10 h-5 rounded-full transition ${
                email ? "bg-black" : "bg-gray-300"
              } relative`}
            >
              <span
                className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition ${
                  email ? "translate-x-5" : ""
                }`}
              />
            </div>
          </label>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-2xl shadow-sm w-80">
        <h2 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <RefreshCw className="w-5 h-5 text-purple-600" />
          Quick Actions
        </h2>

        <button className="flex items-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg mb-3 transition">
          <RefreshCw className="w-4 h-4" /> Sync Centers
        </button>

        <button className="flex items-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg mb-3 transition">
          <Database className="w-4 h-4" /> Run Data Backup
        </button>

        <button className="flex items-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition">
          <Send className="w-4 h-4" /> Resend Failed Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;
