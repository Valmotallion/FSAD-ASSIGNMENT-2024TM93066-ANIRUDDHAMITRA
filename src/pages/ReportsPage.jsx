import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Layout from "../components/Layout";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/reports", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error.response?.data || error.message);
      }
    };

    fetchReports();
  }, []);

  const filteredReports = filter
    ? reports.filter((r) =>
        r.vaccineName.toLowerCase().includes(filter.toLowerCase())
      )
    : reports;

  const pageCount = Math.ceil(filteredReports.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredReports.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const headers = [
    { label: "Student Name", key: "studentName" },
    { label: "Status", key: "status" },
    { label: "Date", key: "date" },
    { label: "Vaccine", key: "vaccineName" },
  ];

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredReports);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "vaccination_reports.xlsx");
  };
  
  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Vaccination Reports</h2>

        <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <input
            type="text"
            placeholder="Filter by vaccine name"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(0); // reset page
            }}
            className="border p-2 rounded w-full md:w-1/3"
          />
          <CSVLink
            data={filteredReports}
            headers={headers}
            filename="vaccination_reports.csv"
            className="bg-blue-500 text-white px-4 py-2 rounded text-center"
          >
            Export CSV
          </CSVLink>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 bg-white shadow">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Student</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Vaccine</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((r, idx) => (
                <tr key={idx}>
                  <td className="border px-4 py-2">{r.studentName}</td>
                  <td className="border px-4 py-2">{r.status}</td>
                  <td className="border px-4 py-2">{new Date(r.date).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{r.vaccineName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleExportExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
              
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"flex justify-center mt-6 space-x-2"} 
          pageClassName={"border px-3 py-1 rounded cursor-pointer"} 
          activeClassName={"bg-blue-500 text-white"} 
          previousClassName={"px-3 py-1 border rounded cursor-pointer"} 
          nextClassName={"px-3 py-1 border rounded cursor-pointer"} 
          disabledClassName={"opacity-50 cursor-not-allowed"} 
        />
      </div>
    </Layout>
  );
};

export default ReportsPage;
