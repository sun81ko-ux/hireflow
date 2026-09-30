type Props = { name: string; size?: number; className?: string }

export default function Icon({ name, size = 18, className = "" }: Props) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    chevron: <path d="m8 10 4 4 4-4" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
    user: <><circle cx="12" cy="8" r="3" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
    x: <><path d="m6 6 12 12M18 6 6 18" /></>,
    filter: <path d="M4 5h16M7 12h10M10 19h4" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <path d="M6 3h3l2 5-2 2a15 15 0 0 0 5 5l2-2 5 2v3c0 1-1 2-2 2C11 20 4 13 4 5c0-1 1-2 2-2Z" />,
    lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3" /><path d="M14 4h5v16h-5" /></>,
    edit: <><path d="M4 20h4L19 9l-4-4L4 16v4Z" /><path d="m13.5 6.5 4 4" /></>,
    trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 14h10l1-14M9 7V4h6v3" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M5 15v4h14v-4" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    building: <><path d="M4 21V5l8-3 8 3v16M8 9h1M8 13h1M8 17h1M15 9h1M15 13h1M15 17h1M3 21h18" /></>,
  }
  return <svg {...common} className={className} aria-hidden="true">{paths[name] || <circle cx="12" cy="12" r="8" />}</svg>
}
