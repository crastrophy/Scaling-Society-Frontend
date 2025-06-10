import {
  DollarSignIcon,
  PhoneForwardedIcon,
  PhoneIcon,
  PhoneIncomingIcon,
} from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../components/ui/card";

export const Box = (): JSX.Element => {
  // Data for metric cards
  const metricCards = [
    {
      icon: <DollarSignIcon className="w-12 h-12" />,
      value: "$125,400",
      label: "Revenue Generated",
      change: "+8% from yesterday",
      changeColor: "text-[#a9dfd8]",
      iconSrc: "/frame.svg",
    },
    {
      icon: <PhoneIncomingIcon className="w-12 h-12" />,
      value: "84",
      label: "Calls Due",
      change: "+8% from yesterday",
      changeColor: "text-[#a9dfd8]",
    },
    {
      icon: <PhoneIcon className="w-12 h-12" />,
      value: "67",
      label: "Calls Taken",
      change: "+2% from yesterday",
      changeColor: "text-[#f2c8ed]",
      iconSrc: "/frame-1.svg",
    },
    {
      icon: <PhoneForwardedIcon className="w-12 h-12" />,
      value: "42",
      label: "Calls Closed",
      change: "+3% from yesterday",
      changeColor: "text-[#20aef3]",
    },
  ];

  return (
    <div className="w-full max-w-[1664px]">
      <Card className="w-full h-[422px] bg-[#21222d] rounded-[36px] border-8 border-solid border-[#454545] shadow-[0px_4px_4px_#00000073]">
        <CardContent className="p-0 relative h-full">
          <div className="flex flex-col w-[216px] h-[62px] items-start gap-[5px] absolute top-[31px] left-[58px] rounded-[36px]">
            <h2 className="relative w-fit mt-[-8.00px] font-semibold text-white text-[32px] tracking-[0] leading-normal">
              Today&apos;s Sales
            </h2>
            <p className="relative w-fit font-medium text-[#a0a0a0] text-[13px] tracking-[0] leading-normal">
              Sales Summary
            </p>
          </div>

          {/* Horizontally distributed metric cards */}
          <div className="absolute top-[120px] left-[58px] right-[58px] flex justify-between items-start">
            {metricCards.map((card, index) => (
              <Card
                key={index}
                className="w-[247px] h-[225px] bg-[#171821] rounded-[15px] border-8 border-solid border-[#454545] shadow-[0px_4px_4px_#00000073]"
              >
                <CardContent className="p-0 relative h-full">
                  <div className="absolute top-16 left-[15px]">
                    {card.iconSrc ? (
                      <img
                        className="w-12 h-12"
                        alt="Icon"
                        src={card.iconSrc}
                      />
                    ) : (
                      <div className="text-white">
                        {card.icon}
                      </div>
                    )}
                  </div>
                  <div className="absolute top-[120px] left-[15px]">
                    <div className="font-semibold text-white text-xl tracking-[0] leading-normal">
                      {card.value}
                    </div>
                    <div className="font-medium text-[#e7e7e7] text-[13px] tracking-[0] leading-normal mt-2">
                      {card.label}
                    </div>
                    <div
                      className={`font-medium text-[10px] tracking-[0] leading-normal mt-1 ${card.changeColor}`}
                    >
                      {card.change}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};