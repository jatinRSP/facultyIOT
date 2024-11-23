import { Button } from "@/components/ui/button"
import { WifiOff } from 'lucide-react'
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <WifiOff className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-2 text-lg font-semibold text-gray-900">No Internet Connection</h2>
        <p className="mt-1 text-sm text-gray-500">Please check your network and try again.</p>
        <div className="mt-6">
          <Button asChild>
            <Link href="/">Try Again</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

