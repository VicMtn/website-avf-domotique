/** Icônes au trait (24×24, stroke), une entrée = liste de tracés SVG. */
export const icons = {
  light: ["M9 18h6M10 21h4", "M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"],
  climate: ["M10 14V5a2 2 0 1 1 4 0v9a4 4 0 1 1-4 0z", "M12 11v6"],
  blinds: ["M4 3h16", "M5 3v18M19 3v18", "M5 8h14M5 12h14M5 16h14"],
  access: ["M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z", "M12 7a2 2 0 1 0 0 4 2 2 0 0 0 0-4z", "M10 15h4"],
  security: ["M12 3 4 6v6c0 4.5 3.4 8 8 9 4.6-1 8-4.5 8-9V6z", "m9 12 2 2 4-4"],
  audio: ["M4 10v4h4l5 4V6l-5 4z", "M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"],
  energy: ["M13 2 4 14h7l-1 8 9-12h-7z"],
  local: ["M6 5h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z", "M8 9h8M8 13h4"],
  lock: ["M6 11h12v10H6z", "M8 11V7a4 4 0 1 1 8 0v4"],
  plug: ["M8 4v5M16 4v5", "M6 9h12v3a6 6 0 0 1-12 0z", "M12 18v3"],
  grow: ["M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3", "M18 3v4h-4M6 21v-4h4"],
} as const;

export type IconName = keyof typeof icons;
