"use client";

import { useEffect, useState } from "react";

interface Faculty {
  facultyName: string;
  mobileNumber: string;
  email: string;
  cabinLocation: string;
  facultyId: string;
  availability: boolean;
  role: string;
}

export default function DashboardPage() {
  const [facultyData, setFacultyData] = useState<Faculty[]>([]);

  useEffect(() => {
    // Fetch faculty data (replace with actual API endpoint)
    fetch("/api/faculty/getAllFaculty")
      .then((res) => res.json())
      .then((data) => setFacultyData(data))
      .catch((error) => console.error("Error fetching faculty data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>
        <p className="text-lg text-gray-700 mb-6">
          Welcome to your dashboard. Here you can view faculty details and their
          availability.
        </p>

        {/* Faculty Table */}
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mobile Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cabin Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {facultyData.map((faculty) => (
                <tr key={faculty.facultyId}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {faculty.facultyName || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {faculty.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {faculty.mobileNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {faculty.cabinLocation || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {faculty.availability ? (
                      <span className="text-green-500 font-medium">
                        Available
                      </span>
                    ) : (
                      <span className="text-red-500 font-medium">
                        Unavailable
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 capitalize">
                    {faculty.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
