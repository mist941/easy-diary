import React, { memo } from 'react';
import { NotebookPen } from 'lucide-react';

const SidebarHeader = memo(function SidebarHeader() {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className="flex flex-col gap-2 p-2 border-sidebar-border h-16 border-b justify-center"
    >
      <div className="flex items-center gap-2">
        <NotebookPen className="size-6" />
        <p className="font-bold text-xl">Easy diary</p>
      </div>
    </div>
  );
});

export { SidebarHeader };
