import React, { useEffect, useState } from "react";

const Timer = ({ quizInfo, setFinishQuiz }) => {
  const now = new Date();
  const startAt = new Date(quizInfo.startAt);

  // startAt'a quizInfo.quizDuration dakika ekle
  startAt.setMinutes(startAt.getMinutes() + quizInfo.quizDuration);

  const getTimeLeft = () => {
    const difference = startAt.getTime() - now.getTime();

    if (difference <= 0) {
      // Quiz süresi dolmuş
      setFinishQuiz({ status: true, type: "timer" });
      return { hours: 0, minutes: 0, seconds: 0 };
    } else {
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return {
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
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
  }, [startAt, now]);

  const { hours, minutes, seconds } = timeLeft;

  return (
    <div>
      {hours}:{minutes}:{seconds}
    </div>
  );
};

export default Timer;
