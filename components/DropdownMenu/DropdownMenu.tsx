import React, { useState } from "react";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import NavButton from "../NavButton/NavButton";
interface IDropdownButton {
  title: string;
  onClick: () => void;
}

type Props = { buttons: IDropdownButton[]; title: string; run: boolean };

function DropdownMenu({ title, buttons, run }: Props) {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div className="relative inline-block min-h-max">
      <NavButton
        disabled={run}
        icon={
          !collapsed ? <FiChevronUp size={23} /> : <FiChevronDown size={23} />
        }
        onClick={() => {
          setCollapsed(!collapsed);
        }}
        text={title}
        iconRight
      ></NavButton>
      {!collapsed && (
        <div
          onMouseLeave={() => setCollapsed(true)}
          className="absolute overflow-visible z-1 flex-col bg-gray-50 shadow-sm p-2 items-center left-0 right-0 flex"
        >
          {buttons.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setCollapsed(true);
                }}
                className="hover:bg-gray-100 w-full pr-2 text-right"
              >
                {item.title}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
