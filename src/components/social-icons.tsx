import type { SVGProps } from "react";

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.3 1.4-1.3h1.5V5.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8.2v2.8h2.3V21h3z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function WhatsappIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.9L3.5 20.5l4.2-1.1A8.5 8.5 0 1 0 12 3.5Zm4.9 12a6.9 6.9 0 0 1-9.8-6.2 6.9 6.9 0 0 1 13.8 0 6.9 6.9 0 0 1-4 6.2Zm-.2-3.6c-.2-.1-1.3-.6-1.5-.7-.2-.1-.3-.1-.5.1s-.6.7-.7.8c-.1.1-.3.2-.5.1-.6-.3-1.2-.7-1.7-1.2-.4-.4-.8-.9-1.1-1.4-.1-.2 0-.4.1-.5l.4-.5c.1-.1.1-.3.1-.4-.1-.2-.5-1.2-.6-1.4-.1-.3-.3-.2-.5-.2h-.4c-.2 0-.4.1-.6.3-.2.3-.7.8-.7 1.8s.7 2 .8 2.2c.9 1.5 2 2.5 3.6 3.2.5.2 1 .3 1.3.4.5.1 1 .1 1.3-.1.4-.2.8-.9.9-1.1.1-.2.1-.4 0-.5s-.2-.1-.4-.2Z" />
    </svg>
  );
}

export function TiktokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.5 3.5c.4 1.9 1.7 3.1 3.6 3.3v2.7c-1.3 0-2.5-.4-3.6-1.1v6.1c0 2.6-2.1 4.7-4.7 4.7S5 17.1 5 14.5s2.1-4.7 4.7-4.7c.3 0 .5 0 .8.1v2.8a2 2 0 1 0 1.4 1.9V3.5h2.6Z" />
    </svg>
  );
}
