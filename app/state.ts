export type State = {
  page: "title" | "main" | "result";
  mode: "basic" | "advanced";
  lottery: string | null;
  candidates: string[] | null;
};

export const initialState: State = {
  page: "title",
  mode: "basic",
  lottery: null,
  candidates: null,
};

export function reducer(state: State, action: Action): State {
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
      if (state.lottery![index] !== "*") {
        return state;
      }
      const newLottery = state.lottery!.slice(0, index) + newValue + state.lottery!.slice(index + 1);
      const pattern = compilePattern(newLottery);
      const newCandidates = state.candidates!.filter((candidate) => pattern.test(candidate));
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

function compilePattern(lottery: string): RegExp {
  return new RegExp(`^${lottery.replace(/\*/g, ".")}$`);
}

export type Action =
  | StartAction
  | PushAction
  | GoResultAction
  | GoBackAction
  | SetModeAction;

export type StartAction = {
  type: "start";
  payload: {
    candidates: string[];
  };
};
export type PushAction = {
  type: "push";
  payload: {
    index: number;
    newValue: string;
  };
};
export type GoResultAction = {
  type: "goResult";
};
export type GoBackAction = {
  type: "goBack";
};
export type SetModeAction = {
  type: "setMode";
  payload: {
    mode: "basic" | "advanced";
  };
};
