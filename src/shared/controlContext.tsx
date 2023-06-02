import { createContext, Dispatch, SetStateAction } from "react";
import moment, { Moment } from "moment";

import { User } from "./utils";

import Goal from "./goal";

type CtrlCtxState = {
  user: User | undefined;
  curTime: Moment;
  ongoingGoals: Goal[];
};

type CtrlCtxType = {
  state: CtrlCtxState;
  setState: Dispatch<SetStateAction<Partial<CtrlCtxState>>>;
};

const CtrlCtxStateDefaultVal: CtrlCtxType = {
  state: { user: undefined, curTime: moment(), ongoingGoals: [] },
  setState: () => {
    // Intentionally left blank
  },
};

const ControlContext = createContext(CtrlCtxStateDefaultVal);

export { ControlContext, CtrlCtxStateDefaultVal };
