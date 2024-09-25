import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AiState {
  aiResponse: {
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AiState = {
  aiResponse: null,
  loading: false,
  error: null,
};

export const fetchAiEvaluation = createAsyncThunk(
  "ai/fetchAiEvaluation",
  async ({ question, answer }: { question: string; answer: string }) => {
    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, answer }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    return response.json();
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiEvaluation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAiEvaluation.fulfilled, (state, action) => {
        state.loading = false;
        state.aiResponse = action.payload;
      })
      .addCase(fetchAiEvaluation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch";
      });
  },
});

export default aiSlice.reducer;
