"use client";

import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

type Employee = {
  id: string; // UUID, but we will display index instead
  name: string;
  position: string;
  department: string;
};

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [search, employees]);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/employees");
      if (!res.ok) throw new Error("Failed to load employees");
      const data = await res.json();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (error) {
      console.error(error);
      alert("Error loading employees.");
    }
    setLoading(false);
  };

  const columns = [
    {
      name: "ID",
      selector: (row: Employee) => employees.indexOf(row) + 1, // Sequential numbering
      sortable: true,
    },
    { name: "Name", selector: (row: Employee) => row.name, sortable: true },
    { name: "Position", selector: (row: Employee) => row.position, sortable: true },
    { name: "Department", selector: (row: Employee) => row.department, sortable: true },
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Employee DataTable</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          min="1"
          placeholder="Go to page..."
          className="p-2 border rounded w-24"
          onChange={(e) => handlePageChange(Number(e.target.value))}
        />
      </div>
      <DataTable
        columns={columns}
        data={filteredEmployees}
        progressPending={loading}
        pagination
        paginationPerPage={10}
        paginationDefaultPage={currentPage}
        fixedHeader
        fixedHeaderScrollHeight="400px"
        highlightOnHover
      />
    </div>
  );
}
