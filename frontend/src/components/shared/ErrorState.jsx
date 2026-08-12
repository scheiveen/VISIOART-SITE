import React from "react";
import { Button } from "../ui/button";

export default function ErrorState({
  message = "Não foi possível carregar as informações.",
  onRetry,
}) {
  return (
    <div className="border border-destructive/30 bg-destructive/5 rounded-lg py-10 px-6 text-center">
      <p className="text-sm text-destructive mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
