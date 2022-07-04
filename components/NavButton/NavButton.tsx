import React, { ReactNode } from "react";

type Props = {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  disabled: boolean;
  fill?: boolean;
  outline?: boolean;
  iconRight?: boolean;
};

function NavButton({
  text,
  icon,
  onClick,
  disabled,
  fill = false,
  outline = false,
  iconRight = false,
}: Props) {
  return (
    <button
      disabled={disabled}
      className={
        ` mx-2 p-1 border-2 border-opacity-0 border-gray-900 disabled:opacity-50 ` +
        (fill ? ` text-gray-50 bg-gray-900 ` : ``) +
        (outline ? `text-gray-900 border-opacity-100 ` : ``)
      }
      onClick={onClick}
    >
      <div className="flex items-center">
        {!iconRight && icon} <span className="px-1">{text}</span>
        {iconRight && icon}
      </div>
    </button>
  );
}

export default NavButton;
