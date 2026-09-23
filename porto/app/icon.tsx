import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

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
          background: "#05010a",
          color: "#f3e8ff",
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: -0.5,
          fontFamily: "Arial Black, Arial, sans-serif",
        }}
      >
        FW
      </div>
    ),
    { ...size },
  );
}
