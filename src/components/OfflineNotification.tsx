"use client";

import { useOffline } from "@/hooks/useOffline";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function OfflineNotification() {
  const isOffline = useOffline();

  if (!isOffline) return null;

  return (
    <Alert variant="destructive" className="fixed top-0 left-0 right-0 z-50">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Offline</AlertTitle>
      <AlertDescription>
        You are currently offline. Some features may be unavailable.
      </AlertDescription>
    </Alert>
  );
}
