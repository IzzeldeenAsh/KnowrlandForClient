import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';
export const runtime = 'edge';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#6366f1',
          color: 'white',
          fontSize: 64,
          fontWeight: 'bold',
        }}
      >
        I
      </div>
    ),
    {
      ...size,
    }
  );
}

