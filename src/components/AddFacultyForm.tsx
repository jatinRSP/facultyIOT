'use client'

import { useState } from 'react'
import { useAddFaculty } from '@/hooks/useAddFaculty'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function AddFacultyForm() {
  const [facultyId, setFacultyId] = useState('')
  const [email, setEmail] = useState('')
  const { addFaculty, isLoading, error, success } = useAddFaculty()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await addFaculty({ facultyId, email })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Faculty</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facultyId">Faculty ID</Label>
            <Input
              id="facultyId"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add Faculty and Send Token'}
          </Button>
        </CardFooter>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="mt-4">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>Faculty added successfully and registration email sent!</AlertDescription>
        </Alert>
      )}
    </Card>
  )
}

