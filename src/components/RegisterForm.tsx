'use client'

import { useState } from 'react'
import { useRegister } from '@/hooks/useRegister'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function RegisterForm() {
  const [facultyId, setFacultyId] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const { register, isLoading, error, success } = useRegister()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register({ facultyId, password, token })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facultyId">Faculty ID</Label>
            <Input
              id="facultyId"
              type="text"
              value={facultyId}
              onChange={(e) => setFacultyId(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="token">Token (from email)</Label>
            <Input
              id="token"
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
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
          <AlertDescription>Registration successful!</AlertDescription>
        </Alert>
      )}
    </Card>
  )
}
