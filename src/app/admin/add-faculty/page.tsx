import AddFacultyForm from '@/components/AddFacultyForm'

export default function AddFacultyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center mb-6">Add New Faculty</h1>
        <AddFacultyForm />
      </div>
    </div>
  )
}

