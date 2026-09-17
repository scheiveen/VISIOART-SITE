import React from "react";
import { Card, CardContent } from "../ui/card";

export default function AuthCard({ eyebrow, title, description, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6 py-16 font-body">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <img
            src="/img/5.png"
            alt="VISIOART"
            className="h-14 w-auto mx-auto mb-5 brightness-0 invert"
          />
          {eyebrow && (
            <p className="font-display text-xs tracking-[0.2em] uppercase text-primary mb-1">
              {eyebrow}
            </p>
          )}
          <h1 className="font-display text-3xl tracking-wide uppercase text-foreground">
            {title}
          </h1>
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        <Card className="border-border bg-card">
          <CardContent className="pt-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
