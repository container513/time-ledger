import { createContext, Dispatch, SetStateAction } from "react";

import Goal from "./goal";

type CtrlCtxState = {
  ongoingGoals: Goal[];
};

type CtrlCtxType = {
  state: CtrlCtxState;
  setState: Dispatch<SetStateAction<CtrlCtxState>>;
};

const CtrlCtxStateDefaultVal: CtrlCtxType = {
  state: { ongoingGoals: [] },
  setState: () => {
    // intentionally left blank
  },
};

const ControlContext = createContext(CtrlCtxStateDefaultVal);

export { ControlContext, CtrlCtxStateDefaultVal };
