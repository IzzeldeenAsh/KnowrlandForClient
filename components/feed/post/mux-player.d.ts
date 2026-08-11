// @mux/mux-player registers a <mux-player> custom element but ships no JSX typings
// (that's the separate @mux/mux-player-react package, which we didn't add).
//
// React 19's JSX.IntrinsicElements lives at React.JSX (declare namespace React {
// namespace JSX {...} } in @types/react), and react/jsx-runtime's IntrinsicElements
// extends that — so this must augment 'react', not a global JSX namespace, or the
// merge silently no-ops.
import type { DetailedHTMLProps, HTMLAttributes } from 'react'

type MuxPlayerAttributes = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  'playback-id'?: string
  'stream-type'?: string
  poster?: string
  'metadata-video-title'?: string
  preload?: 'none' | 'metadata' | 'auto' | ''
  'max-resolution'?: '480p' | '540p' | '720p' | '1080p' | '1440p' | '2160p'
  'primary-color'?: string
  'accent-color'?: string
  // No Mux Data env-key is configured, so this is inert either way, but set
  // explicitly rather than relying on that — avoids an undeclared beacon to
  // img.litix.io (blocked by CSP connect-src regardless; this just keeps it
  // from being attempted at all).
  'disable-tracking'?: boolean | ''
  autoplay?: boolean | 'muted' | ''
  muted?: boolean | ''
  loop?: boolean | ''
  playsinline?: boolean | ''
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'mux-player': MuxPlayerAttributes
    }
  }
}
