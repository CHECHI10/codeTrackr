const base = 'h-5 w-5';

export const Icon = ({ children, className = base, ...props }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    {children}
  </svg>
);

export const SunIcon = ({ className = base }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </Icon>
);

export const MoonIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M12 3a6 6 0 0 0 9 7.5A9 9 0 1 1 12 3Z" />
  </Icon>
);

export const HamburgerIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </Icon>
);

export const CloseIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </Icon>
);

export const SearchIcon = ({ className = base }) => (
  <Icon className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </Icon>
);

export const LogOutIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5" />
    <path d="M21 12H9" />
  </Icon>
);

export const PlusIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </Icon>
);

export const DiceIcon = ({ className = base }) => (
  <Icon className={className}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <circle cx="9" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="9" r="1" fill="currentColor" stroke="none" />
    <circle cx="9" cy="15" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

export const TrashIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </Icon>
);

export const EditIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </Icon>
);

export const RefreshIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
    <path d="M3 21v-5h5" />
    <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
    <path d="M21 3v5h-5" />
  </Icon>
);

export const ExternalLinkIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </Icon>
);

export const HomeIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="m3 11 9-8 9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </Icon>
);

export const PanelIcon = ({ className = base }) => (
  <Icon className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M9 4v16" />
  </Icon>
);

export const BarChartIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M3 3v18h18" />
    <path d="M8 17V9" />
    <path d="M13 17V5" />
    <path d="M18 17v-4" />
  </Icon>
);

export const BookIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5Z" />
  </Icon>
);

export const FilterIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="M22 3H2l8 9v7l4 2v-9Z" />
  </Icon>
);

export const ArrowUpIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="m18 15-6-6-6 6" />
  </Icon>
);

export const ArrowDownIcon = ({ className = base }) => (
  <Icon className={className}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const CheckCircleIcon = ({ className = `${base} text-emerald-500` }) => (
  <Icon className={className}>
    <path d="M20 6 9 17l-5-5" />
    <circle cx="12" cy="12" r="10" />
  </Icon>
);

export const AttemptedCircleIcon = ({ className = `${base} text-orange-500` }) => (
  <Icon className={className}>
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
    <circle cx="12" cy="12" r="10" />
  </Icon>
);

export const UnsolvedCircleIcon = ({ className = `${base} text-neutral-400` }) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 12h8" />
  </Icon>
);

export const StatusIcon = ({ status }) => {
  switch (status) {
    case 'solved':
      return <CheckCircleIcon />;
    case 'attempted':
      return <AttemptedCircleIcon />;
    case 'unsolved':
    default:
      return <UnsolvedCircleIcon />;
  }
};
