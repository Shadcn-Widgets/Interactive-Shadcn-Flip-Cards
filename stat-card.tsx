"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { animated, useSpring } from "@react-spring/web";
import { MoreVertical, TrendingDown, TrendingUp } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type ChartDataPoint = {
  date: string;
  value: number;
};

type StatCardProps = {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  icon: React.ReactNode;
  change: number;
  chartData: ChartDataPoint[];
  chartColor: string;
  gradient: string;
  progress: number;
  menuItems?: {
    label: string;
    onClick: () => void;
  }[];
};

function lightenHexColor(hex: string, percent: number): string {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  // Convert hex to RGB
  let r = parseInt(hex.slice(0, 2), 16);
  let g = parseInt(hex.slice(2, 4), 16);
  let b = parseInt(hex.slice(4, 6), 16);

  // Convert to decimal and increase by percentage
  r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
  g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
  b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

  // Convert back to hex
  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export default function StatCard({
  title,
  value,
  prefix = "",
  suffix = "",
  icon,
  change,
  chartData,
  chartColor,
  gradient,
  progress,
  menuItems,
}: StatCardProps) {
  const isPositive = change >= 0;
  const ChangeIcon = isPositive ? TrendingUp : TrendingDown;
  const [isFlipped, setIsFlipped] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [shouldAnimate, setShouldAnimate] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
  }, []);

  const { number } = useSpring({
    from: { number: 0 },
    number: shouldAnimate ? value : 0,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 },
  });

  const { transform, opacity } = useSpring({
    opacity: isFlipped ? 1 : 0,
    transform: `perspective(600px) rotateY(${isFlipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const dateFormatter = useCallback((date: string) => {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }, []);

  const valueFormatter = useCallback(
    (value: number): string => {
      const USformatter = new Intl.NumberFormat("en-US", {
        notation: "compact",
      });
      const USformattedNumber = USformatter.format(value);
      return suffix
        ? `${USformattedNumber}${suffix}`
        : prefix
        ? `${prefix}${USformattedNumber}`
        : USformattedNumber;
    },
    [suffix, prefix]
  );

  const handleMouseEnter = () => {
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isDropdownOpen) {
      setIsFlipped(false);
    }
  };

  return (
    <div
      className="relative w-full h-[200px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <animated.div
        style={{ opacity: opacity.to((o) => 1 - o), transform }}
        className={`absolute inset-0 w-full h-full ${
          isFlipped ? "pointer-events-none" : ""
        }`}
      >
        <Card
          className={`w-full h-full overflow-hidden bg-gradient-to-br ${gradient}`}
        >
          <CardContent className="p-4 md:p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white bg-opacity-20 text-gray-200 rounded-full">
                  {icon}
                </div>
                <span className="text-lg uppercase font-medium text-white">
                  {title}
                </span>
              </div>
              <div className={`flex items-center font-black text-white`}>
                <ChangeIcon
                  className={cn(
                    "h-5 w-5 mr-1 drop-shadow-md",
                    isPositive ? "text-green-500" : "text-red-500"
                  )}
                />
                <span className={"text-base font-medium"}>
                  {Math.abs(change).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="flex-grow flex items-center justify-start">
              <div className="flex justify-end items-end gap-1">
                <span className="text-4xl font-bold text-white">
                  {prefix}
                  <animated.span>
                    {number.to((n) => {
                      const formatted = n.toFixed(suffix ? 1 : 0);
                      return formatted.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    })}
                  </animated.span>
                  {suffix}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <Progress
                value={Math.abs(progress) * 100}
                className="w-full h-1 bg-white bg-opacity-20 [&>*]:bg-gray-200"
              />
            </div>
          </CardContent>
        </Card>
      </animated.div>
      <animated.div
        style={{
          opacity,
          transform,
          rotateY: "180deg",
        }}
        className={`absolute inset-0 w-full h-full ${
          !isFlipped ? "pointer-events-none" : ""
        }`}
      >
        <Card
          className={`w-full h-full overflow-hidden bg-gradient-to-br ${gradient}`}
        >
          <CardContent className="p-4 flex flex-col h-full justify-between">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-white uppercase">
                {title} Trend
              </h3>
              {menuItems && (
                <div ref={menuRef}>
                  <DropdownMenu onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger asChild>
                      <button className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50">
                        <MoreVertical className="h-5 w-5" />
                        <span className="sr-only">Open menu</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {menuItems.map((item) => (
                        <DropdownMenuItem
                          key={item.label}
                          onClick={item.onClick}
                        >
                          {item.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
            <ChartContainer
              config={{
                value: {
                  color: chartColor,
                  label: title,
                },
              }}
              className="aspect-auto h-[calc(100%-2rem)] w-full [&_.recharts-cartesian-axis-tick_text]:!fill-white"
            >
              <BarChart
                accessibilityLayer
                data={chartData}
                margin={{ top: 5, right: 5, bottom: 5, left: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={lightenHexColor(chartColor, 20)}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.5)"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={dateFormatter}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  tickFormatter={valueFormatter}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      indicator="dashed"
                      labelFormatter={dateFormatter}
                    />
                  }
                />
                <Bar
                  type="monotone"
                  dataKey="value"
                  stroke={lightenHexColor(chartColor, 50)}
                  strokeWidth={0.5}
                  fill={chartColor}
                  name={title}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </animated.div>
    </div>
  );
}
