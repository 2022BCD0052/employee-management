export default function Home() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Welcome to Employee Management System</h1>
        <div className="space-x-4">
          <a href="/employees" className="px-6 py-3 bg-blue-500 text-white rounded-lg">
            View Employees
          </a>
          <a href="/employees/add" className="px-6 py-3 bg-green-500 text-white rounded-lg">
            Add Employee
          </a>
        </div>
      </div>
    );
  }
  