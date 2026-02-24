import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Credat — The Trust Layer for AI Agents";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            display: "flex",
          }}
        />

        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "rgba(37, 99, 235, 0.08)",
            filter: "blur(100px)",
            top: -100,
            right: 100,
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.06)",
              backgroundColor: "rgba(255,255,255,0.8)",
              fontSize: 16,
              color: "#6B7280",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#2563EB",
                display: "flex",
              }}
            />
            Open Source SDK
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0A0A0A",
              lineHeight: 1.05,
              textAlign: "center",
              maxWidth: 900,
              display: "flex",
            }}
          >
            The Trust Layer for AI Agents
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 24,
              color: "#6B7280",
              textAlign: "center",
              maxWidth: 700,
              lineHeight: 1.5,
              display: "flex",
            }}
          >
            Identity · Delegation · Verification
          </div>

          {/* CTA pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 16,
              padding: "12px 28px",
              borderRadius: 999,
              backgroundColor: "#2563EB",
              color: "white",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            npm install credat
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 16,
            color: "#9CA3AF",
          }}
        >
          credat.io
        </div>
      </div>
    ),
    { ...size }
  );
}
