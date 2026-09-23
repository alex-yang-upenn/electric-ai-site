import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          borderRadius: 16,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 28 28">
          <polyline
            points="15,3 6,15.5 12.5,15.5 10,25 21,11.5 14.5,11.5 15,3"
            fill="rgba(255,42,42,0.25)"
            stroke="#ff2a2a"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
