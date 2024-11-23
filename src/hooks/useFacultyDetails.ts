import { useState, useCallback } from 'react'

interface FacultyDetails {
  facultyName: string
  mobileNumber: string
  email: string
  cabinLocation: string
  facultyId: string
  mac?: string
}

export function useFacultyDetails() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitDetails = useCallback(async (data: FacultyDetails) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch('/api/faculty/addDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit faculty details')
      }

      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { submitDetails, isLoading, error, success }
}

