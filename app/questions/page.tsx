"use client";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Button,
  Typography,
  Stack,
  Card,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleQuestions } from "../todoActions";
import Timer from "../components/timer";
import { data } from "../data/questions";

export default function Questions() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("quizFinished") === "true") {
      router.replace("/result");
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleChange = (event: number, index: number) => {
    setAnswers({ ...answers, [index + 1]: event + 1 });
  };

  const handleSubmit = async () => {
    await handleQuestions(answers);
    localStorage.setItem("quizFinished", "true");
    router.replace("/result");
  };

  if (loading) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh" }}
      >
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Stack sx={{ mt: 5, p: 5, alignItems: "center" }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundColor: "#1976D2",
          color: "white",
          borderRadius: "12px",
          py: 2,
          px: 4,
          mb: 3,
          width: "100%",
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          آزمون آنلاین
        </Typography>
      </Stack>

      <Timer answers={answers} />

      <FormControl sx={{ width: "100%", maxWidth: "800px" }}>
        {data.map((item, index) => (
          <Card key={index} sx={{ mb: 3, p: 2, borderRadius: "12px" }}>
            <Typography fontWeight="bold" sx={{ mb: 1 }}>
              {index + 1}. {item.question}
            </Typography>
            <RadioGroup
              name={`quiz-question-${index}`}
              onChange={(e) => handleChange(+e.target.value, index)}
            >
              {item.choices.map((choice, i) => (
                <FormControlLabel
                  key={i}
                  value={i}
                  control={<Radio />}
                  label={choice}
                  sx={{
                    width: "100%",
                    p: 1,
                    borderRadius: "8px",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </Card>
        ))}
      </FormControl>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3, px: 4, py: 1.5, fontSize: "1.1rem", borderRadius: "8px" }}
      >
        📩 ثبت پاسخ‌ها
      </Button>
    </Stack>
  );
}
