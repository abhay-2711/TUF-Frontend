"use client";
import React, { useEffect, useState } from "react";

const Countdown = ({ timer }) => {
  const [remainingTime, setRemainingTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Calculate the target date only once when the component mounts
    const now = new Date();
    const targetDate = new Date(now.getTime() + timer * 1000);

    const calculateRemainingTime = () => {
      const now = new Date();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setRemainingTime({
          days,
          hours,
          minutes,
          seconds,
        });
      } else {
        setRemainingTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    calculateRemainingTime();

    const interval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]); // Recalculate only when the timer prop changes

  return (
    <div className="grid grid-cols-4 gap-2 text-center md:gap-6">
      <Cricular text="Days" time={remainingTime.days} style={"px-6 py-4"} />
      <Cricular text="Hours" time={remainingTime.hours} style={"px-6 py-4"} />
      <Cricular
        text="Minutes"
        time={remainingTime.minutes}
        style={"px-4 py-4"}
      />
      <Cricular
        text="Seconds"
        time={remainingTime.seconds}
        style={"px-4 py-4"}
      />
    </div>
  );
};

const Cricular = ({ text, time, style }) => {
  return (
    <div className="flex flex-col" style={{ position: "relative" }}>
      <img
        src="/vector.svg"
        alt="vector"
        className="h-[80px] w-[80px] md:h-[100px] md:w-[100px]"
      />
      <span
        className="text-4xl font-bold md:text-5xl"
        style={{
          position: "absolute",
          top: "38%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {time}
      </span>
      <div>
        <p className="text-xs mt-3 text-white font-semibold sm:text-sm">
          {text}
        </p>
      </div>
    </div>
  );
};

export default Countdown;
