import AddFacultyForm from '@/components/AddFacultyForm'

export default function Home() {
  return (
    <main className="custom-bg min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <h1 className="custom-text text-3xl font-bold text-center mb-6">Faculty Management</h1>
        <AddFacultyForm />
      </div>
    </main>
  )
}

