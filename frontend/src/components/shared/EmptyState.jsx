import React from "react";

export default function EmptyState({ title, description, action }) {
  return (
    <div className="border border-dashed border-border rounded-lg py-16 px-6 text-center">
      <p className="font-display text-lg tracking-wide uppercase text-foreground mb-2">
        {title}
      </p>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
