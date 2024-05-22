import React, { useEffect, useState } from "react";

const useTimer = (startTime, addMinutes) => {
  const now = new Date();
  const startAt = new Date(startTime);
  // startAt'a quizInfo.quizDuration dakika ekle
  startAt.setMinutes(startAt.getMinutes() + addMinutes);

  const getTimeLeft = () => {
    const difference = startAt.getTime() - now.getTime();

    if (difference <= 0) {
      // Quiz süresi dolmuş

      return { hours: 0, minutes: 0, seconds: 0, statu: false };
    } else {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return {
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
        statu: true,
      };
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, now]);

  const { hours, minutes, seconds } = timeLeft;
  return timeLeft;
  // return (
  //   <div>
  //     {hours}:{minutes}:{seconds}
  //   </div>
  // );
};

export default useTimer;
