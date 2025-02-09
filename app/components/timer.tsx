"use client";

import { Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { initialTimer } from "../data/questions";
import { handleQuestions } from "../todoActions";

export default function Timer({
  answers,
}: {
  answers: { [key: number]: number };
}) {
  const [timer, setTimer] = useState(initialTimer);
  const router = useRouter();

  useEffect(() => {
    if (timer === 0) {
      localStorage.setItem("quizFinished", "true");
      router.replace("/result");
      handleQuestions(answers);
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, router]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        p: 2,
        textAlign: "center",
        fontWeight: "bold",
        zIndex: 1000,
      }}
    >
      <Typography variant="h6">
        ⏳ زمان باقی‌مانده: {Math.max(timer, 0)} ثانیه
      </Typography>
    </Box>
  );
}
