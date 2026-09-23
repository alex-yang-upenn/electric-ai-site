import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(ellipse 80% 70% at 50% 0%, rgba(255,42,42,0.35), #050505 70%)",
          color: "#f5f5f4",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="56" height="56" viewBox="0 0 28 28">
            <rect x="0.5" y="0.5" width="27" height="27" rx="7" fill="#0b0b0c" stroke="rgba(255,255,255,0.2)" />
            <polyline
              points="15,3 6,15.5 12.5,15.5 10,25 21,11.5 14.5,11.5 15,3"
              fill="rgba(255,42,42,0.25)"
              stroke="#ff2a2a"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>{siteConfig.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.02, maxWidth: 1000 }}>
            The world&apos;s experts are already generating the data robots need.
          </div>
          <div style={{ fontSize: 28, color: "rgba(245,245,244,0.6)" }}>
            Expert video → structured training data for physical AI
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "rgba(245,245,244,0.45)" }}>
          <span>{siteConfig.domain}</span>
          <span style={{ color: "#ff2a2a" }}>● The data layer for physical AI</span>
        </div>
      </div>
    ),
    size,
  );
}
