import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormShellProps {
  id: string;
  title: string;
  description: string;
  steps: string[];
  current: number;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
}

export function FormShell({
  id,
  title,
  description,
  steps,
  current,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
  children,
}: FormShellProps) {
  const total = steps.length;
  const isLast = current === total - 1;

  return (
    <Card id={id} className="scroll-mt-24 border-border/70 shadow-sm">
      <CardContent className="p-6 sm:p-8">
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>

        <div className="mt-6 mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Paso {current + 1} de {total} · {steps[current]}
            </span>
            <span>{Math.round(((current + 1) / total) * 100)}%</span>
          </div>
          <Progress value={((current + 1) / total) * 100} className="h-2" />
          <div className="mt-4 flex flex-wrap gap-2">
            {steps.map((label, index) => (
              <span
                key={label}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  index === current
                    ? "bg-primary text-primary-foreground"
                    : index < current
                      ? "bg-primary/10 text-primary"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {index + 1}. {label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-6">{children}</div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <Button type="button" variant="ghost" onClick={onBack} disabled={current === 0 || isSubmitting}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Atrás
          </Button>
          {isLast ? (
            <Button type="button" onClick={onSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  Enviar registro <CheckCircle2 className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          ) : (
            <Button type="button" onClick={onNext} disabled={isSubmitting}>
              Continuar <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function SuccessCard({ id, title, message }: { id: string; title: string; message: string }) {
  return (
    <Card id={id} className="scroll-mt-24 border-primary/30 bg-primary/5">
      <CardContent className="p-8 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="mt-3 text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
