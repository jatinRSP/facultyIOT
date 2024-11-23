import FacultyDetailsForm from '@/components/FacultyDetailsForm'

export default function FacultyDetailsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Faculty Details</h1>
        <FacultyDetailsForm />
      </div>
    </div>
  )
}

