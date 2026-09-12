import { Button } from "@/components/ui/button"

import { useLiveMonitoring } from "../hooks/use-live-monitoring"

export function MonitoringControls() {
  const {
    activeSession,
    startMonitoring,
    isStarting,
    stopMonitoring,
    isStopping,
  } = useLiveMonitoring()

  if (activeSession) {
    return (
      <Button
        variant="destructive"
        onClick={() => stopMonitoring(activeSession.id)}
        disabled={isStopping}
      >
        {isStopping ? "Stopping..." : "Stop Monitoring"}
      </Button>
    )
  }

  return (
    <Button onClick={() => startMonitoring()} disabled={isStarting}>
      {isStarting ? "Starting..." : "Start Monitoring"}
    </Button>
  )
}
