import { cn } from "@/lib/utils";

interface JobInfoProps {
  icon: React.ReactNode;
  text: string;
  label?: string;
  className?: string;
}

function JobInfo({ icon, text, label, className }: JobInfoProps) {
  return (
    <div className={cn("flex gap-x-3 items-center", className)}>
      <div className="text-primary/70">{icon}</div>
      <div>
        {label && (
          <span className="block text-xs text-muted-foreground mb-1 capitalize">{label}</span>
        )}
        <span className={cn("text-sm", label && "font-medium")}>{text}</span>
      </div>
    </div>
  );
}

export default JobInfo;
    