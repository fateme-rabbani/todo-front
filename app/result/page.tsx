"use client";

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  Card,
} from "@mui/material";
import { data } from "../data/questions";
import { useRouter } from "next/navigation";

export default function Result() {
  const router = useRouter();

  const handleRestartQuiz = () => {
    localStorage.removeItem("quizFinished");
    router.replace("/questions");
  };

  return (
    <Stack sx={{ p: 5 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          // backgroundColor: "#00A693",
          backgroundColor: "#1976D2",

          color: "white",
          borderRadius: "12px",
          py: 2,
          mb: 3,
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          نتایج آزمون
        </Typography>
      </Stack>

      <Card
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "12px",
          backgroundColor: "#f5f5f5",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          ⭐ امتیاز شما: <span style={{ color: "#1976D2" }}>10</span>
        </Typography>
        <Button variant="contained" color="primary">
          مرحله‌ی بعد
        </Button>
      </Card>

      <FormControl sx={{ width: "100%" }}>
        {data.map((item, index) => (
          <Card key={index} sx={{ mb: 3, p: 2, borderRadius: "12px" }}>
            <span>
              {index + 1}. {item.question}
            </span>
            <RadioGroup name={`quiz-question-${index}`}>
              {item.choices.map((choice, i) => {
                const isCorrect = i === item.correctAnswer;
                const isUserChoice = i === item.userAnswer;
                const isWrong = isUserChoice && !isCorrect;

                return (
                  <Box
                    key={i}
                    sx={{
                      width: "100%",
                      border: isCorrect
                        ? "1px solid #00A693"
                        : isWrong
                        ? "1px solid #ED583B"
                        : "1px solid transparent",
                      borderRadius: "8px",
                      mt: 1,
                    }}
                  >
                    <FormControlLabel
                      value={i}
                      control={
                        <Radio
                          checked={isCorrect || isUserChoice}
                          sx={{
                            color: isWrong
                              ? "#ED583B"
                              : isCorrect
                              ? "#00A693"
                              : "default",
                            "&.Mui-checked": {
                              color: isWrong
                                ? "#ED583B"
                                : isCorrect
                                ? "#00A693"
                                : "default",
                            },
                          }}
                        />
                      }
                      label={choice}
                      sx={{
                        width: "100%",
                        display: "block",
                      }}
                    />
                  </Box>
                );
              })}
            </RadioGroup>
          </Card>
        ))}
      </FormControl>

      <Box textAlign="center" mt={3}>
        <Button
          variant="outlined"
          color="secondary"
          href="/questions"
          onClick={handleRestartQuiz}
        >
          🔄 بازگشت به سوالات
        </Button>
      </Box>
    </Stack>
  );
}
