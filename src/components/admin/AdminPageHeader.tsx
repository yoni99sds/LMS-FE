import {
  Plus,
  type LucideIcon,
} from "lucide-react";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: LucideIcon;
  onAction?: () => void;
  children?: ReactNode;
}

const AdminPageHeader = ({
  title,
  description,
  actionLabel,
  actionIcon: ActionIcon = Plus,
  onAction,
  children,
}: AdminPageHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {children}

        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            className="rounded-xl"
          >
            <ActionIcon className="mr-2 h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminPageHeader;