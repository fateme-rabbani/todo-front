"use client";

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleQuestions } from "../todoActions";
import Timer from "../components/timer";
import { data } from "../data/questions";

export default function Questions() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const router = useRouter();

  const handleChange = (event: number, index: number) => {
    setAnswers({ ...answers, [index + 1]: event + 1 });
  };

  const handleSubmit = async () => {
    await handleQuestions(answers);
    router.replace("/result");
  };

  return (
    <Box sx={{ mt: 5, p: 5, display: "flex", flexDirection: "column" }}>
      <Timer />
      <FormControl>
        {data.map((item, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <span>
              {index + 1}. {item.question}
            </span>
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
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        ثبت
      </Button>
    </Box>
  );
}
