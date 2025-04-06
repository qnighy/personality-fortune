export const initialState = {
  page: "title",
  mode: "basic",
  lottery: null,
  candidates: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "start": {
      const { candidates } = action.payload;
      return {
        ...state,
        page: "main",
        lottery: "****",
        candidates,
      };
    }
    case "push": {
      const { index, newValue } = action.payload;
      if (state.lottery[index] !== "*") {
        return state;
      }
      const newLottery = state.lottery.slice(0, index) + newValue + state.lottery.slice(index + 1);
      const pattern = compilePattern(newLottery);
      const newCandidates = state.candidates.filter((candidate) => pattern.test(candidate));
      if (newCandidates.length === 0) {
        return state;
      }
      return {
        ...state,
        lottery: newLottery,
        candidates: newCandidates,
      }
    }
    case "goResult": {
      return {
        ...state,
        page: "result",
      };
    }
    case "goBack":
      return {
        ...state,
        page: initialState.page,
        lottery: initialState.lottery,
        candidates: initialState.candidates,
      };
    case "setMode": {
      const { mode } = action.payload;
      return {
        ...state,
        mode,
      };
    }
    default:
      return state;
  }
}

function compilePattern(lottery) {
  return new RegExp(`^${lottery.replace(/\*/g, ".")}$`);
}
