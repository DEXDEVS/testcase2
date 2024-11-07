import React from "react";

export default function VisitorIcon({ className }) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="currentcolor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M1 2H0V9C0 9.55 0.45 10 1 10H8V9H1V2ZM9 0H3C2.45 0 2 0.45 2 1V7C2 7.55 2.45 8 3 8H9C9.55 8 10 7.55 10 7V1C10 0.45 9.55 0 9 0ZM6 1C6.83 1 7.5 1.67 7.5 2.5C7.5 3.33 6.83 4 6 4C5.17 4 4.5 3.33 4.5 2.5C4.5 1.67 5.17 1 6 1ZM9 7H3V6.25C3 5.255 5 4.75 6 4.75C7 4.75 9 5.255 9 6.25V7Z" />
    </svg>
  );
}
