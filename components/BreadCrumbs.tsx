import React from "react";
import { BreadCrumbItem } from "@/lib/types/global";
import Link from "next/link";
import { RxCaretRight } from "react-icons/rx";
import { AiOutlineHome } from "react-icons/ai";

const BreadCrumbs = ({ breadCrumbs, className = "" }: { breadCrumbs: BreadCrumbItem[], className?: string }) => {
  return (
    <div className={`flex flex-row items-center gap-2 ${className}`}>
      <Link href="/" className="text-sm">
        <AiOutlineHome className="text-greys2" size={16} />
      </Link>
      {breadCrumbs.length > 0 && <RxCaretRight className="text-greys2" />}

      {breadCrumbs.map((crumb, idx) => (
        <div className="flex flex-row items-center gap-2" key={crumb.label}>
          <Link href={crumb.href} className="text-sm hover:text-senary transition-all duration-300 hover:underline max-w-[200px] truncate">
            {crumb.label}
          </Link>
          {idx !== breadCrumbs.length - 1 && <RxCaretRight className="text-greys2" />}
        </div>
      ))}
    </div>
  );
};

export default BreadCrumbs;
