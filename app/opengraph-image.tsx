import { ImageResponse } from "next/og";
import { site } from "./data";

export const alt = `${site.name} | ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The preview card shown when the site link is shared on social media or in chats.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          color: "white",
          backgroundColor: "#07070b",
          borderLeft: "16px solid #2563eb",
        }}
      >
        <div style={{ fontSize: 36, color: "#a1a1b5" }}>Hey, I’m</div>
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05 }}>{site.name}</div>
        <div style={{ marginTop: 28, fontSize: 40, color: "#3b82f6" }}>{site.role}</div>
      </div>
    ),
    size
  );
}
