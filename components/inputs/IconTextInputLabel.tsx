import React from "react";
import { GoCheck } from "react-icons/go";
const IconTextInputLabel = ({ Icon = GoCheck, label="Input label" }: { Icon: React.ReactNode, label: string }) => {
  return (
    <div className="flex flex-row items-center gap-3">
      <div className="w-[30px] h-[30px] bg-fenary flex rounded-full text-senary ">
        <Icon className="m-auto" />
      </div>
      <p className="text-black/70 text-sm capitalize">{label}</p>
    </div>
  );
};

export default IconTextInputLabel;
