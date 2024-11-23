'use client'

import { useState, useCallback } from 'react'
import { useFacultyDetails } from '@/hooks/useFacultyDetails'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import DeviceSelector from '@/components/DeviceSelector'

export default function FacultyDetailsForm() {
  const [facultyName, setFacultyName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [cabinLocation, setCabinLocation] = useState('')
  const [facultyId, setFacultyId] = useState('')
  const [mac, setMac] = useState('')
  const [showDeviceSelector, setShowDeviceSelector] = useState(false)
  const { submitDetails, isLoading, error, success } = useFacultyDetails()

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    await submitDetails({ facultyName, mobileNumber, email, cabinLocation, facultyId, mac })
  }, [submitDetails, facultyName, mobileNumber, email, cabinLocation, facultyId, mac])

  const handleDeviceSelect = (selectedMac: string) => {
    setMac(selectedMac)
    setShowDeviceSelector(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Details</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="facultyName">Faculty Name</Label>
            <Input
              id="facultyName"
              value={facultyName}
              onChange={(e) => setFacultyName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
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
          <div className="space-y-2">
            <Label htmlFor="cabinLocation">Cabin Location</Label>
            <Input
              id="cabinLocation"
              value={cabinLocation}
              onChange={(e) => setCabinLocation(e.target.value)}
              required
            />
          </div>
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
            <Label htmlFor="mac">MAC Address (Optional)</Label>
            <div className="flex space-x-2">
              <Input
                id="mac"
                value={mac}
                onChange={(e) => setMac(e.target.value)}
                placeholder="XX:XX:XX:XX:XX:XX"
              />
              <Button type="button" onClick={() => setShowDeviceSelector(true)}>
                Select Device
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Details'}
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
          <AlertDescription>Faculty details submitted successfully!</AlertDescription>
        </Alert>
      )}
      {showDeviceSelector && (
        <DeviceSelector onSelect={handleDeviceSelect} onClose={() => setShowDeviceSelector(false)} />
      )}
    </Card>
  )
}

