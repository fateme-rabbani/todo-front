import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { data } from "../data/questions";

export default function Result() {
  return (
    <>
      <Stack alignItems="center" sx={{ mt: 2 }}>
        <Typography variant="h4" fontWeight="bold">
          نتایج:
        </Typography>
      </Stack>
      <FormControl sx={{ width: "100%", p: 5 }}>
        {data.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
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
          </Box>
        ))}
      </FormControl>
      <a href="/questions">بازگشت</a>
    </>
  );
}
