export interface BatchPayload {
  batch_id: string
  manufacturer_id: string
  product_name: string
  dosage: string
  manufacture_date: string
  expiry_date: string
  authorized_region: string
  serial_number: string
}

export interface SignedQRPayload {
  data: BatchPayload
  signature: string      // hex-encoded Ed25519 signature
  public_key: string     // hex-encoded public key (embedded for offline verification)
  issued_at: string
}

export interface VerificationResult {
  valid: boolean
  batch_data: BatchPayload | null
  failure_reason: string | null
  verified_at: string
  verification_method: "ED25519_OFFLINE"
  expired?: boolean
  expired_since?: string
}

export interface SuspiciousReport {
  report_id: string
  batch_id: string
  reporter_location: { lat: number, lng: number }
  description: string
  image_base64?: string
  reported_at: string
  synced: boolean
}

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
