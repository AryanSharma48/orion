// Export the shared types, keeping them here to satisfy standard project structure logic or use them directly
export interface ScanEvent {
  scan_id: string
  batch_id: string
  manufacturer_id: string
  lat: number
  lng: number
  timestamp: number
  verdict: "AUTHENTIC" | "SUSPICIOUS" | "COUNTERFEIT"
  final_risk_score: number
}

export interface AnomalyFlag {
  flag_id: string
  type: "VELOCITY" | "VOLUME" | "DISPATCH_MISMATCH"
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL"
  batch_id: string
  region: { lat: number, lng: number }
  description: string
  timestamp: number
}

export interface RiskMapPoint {
  lat: number
  lng: number
  intensity: number
  flags: AnomalyFlag[]
  scan_count: number
}
