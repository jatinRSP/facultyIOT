'use client'

import { useState, useEffect, useCallback } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Device {
  _id: string
  name: string
  mac: string
}

interface DeviceSelectorProps {
  onSelect: (mac: string) => void
  onClose: () => void
}

export default function DeviceSelector({ onSelect, onClose }: DeviceSelectorProps) {
  const [devices, setDevices] = useState<Device[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/devices')
        if (!response.ok) {
          throw new Error('Failed to fetch devices')
        }
        const data = await response.json()

        console.log(data)

        setDevices(data.data)
        setFilteredDevices(data.data)
      } catch (error) {
        console.error('Error fetching devices:', error)
        setError('Failed to load devices. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDevices()
  }, [])

  const filterDevices = useCallback(() => {
    const filtered = devices.filter(
      (device) =>
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.mac.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredDevices(filtered)
    console.log(filtered)
  }, [searchTerm, devices])

  useEffect(() => {
    filterDevices()
  }, [filterDevices])

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Select Your Device</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Search devices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading ? (
            <p>Loading devices...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="max-h-[300px] overflow-y-auto space-y-2">
              {filteredDevices.map((device) => (
                <Button
                  key={device._id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onSelect(device.mac)}
                >
                  {device.name} - {device.mac || "No Mac Address"}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

