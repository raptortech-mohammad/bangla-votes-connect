
import React, { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: number;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-brand-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            {trend !== undefined && (
              <div className="flex items-center mt-2">
                {trend > 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                ) : trend < 0 ? (
                  <ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" />
                ) : (
                  <Minus className="h-3 w-3 text-brand-gray-500 mr-1" />
                )}
                <span
                  className={cn(
                    "text-xs font-semibold",
                    trend > 0
                      ? "text-emerald-500"
                      : trend < 0
                      ? "text-rose-500"
                      : "text-brand-gray-500"
                  )}
                >
                  {trend > 0 ? "+" : ""}
                  {trend}%
                </span>
                <span className="text-xs text-brand-gray-500 ml-1">
                  vs. last month
                </span>
              </div>
            )}
          </div>
          {icon && <div className="text-brand-primary">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
