import { createContext, Dispatch, SetStateAction } from "react";
import moment, { Moment } from "moment";

import { User } from "./utils";

import Goal from "./goal";

type CtrlCtxState = {
  user: User | undefined;
  curTime: Moment;
  ongoingGoals: { [key: string]: Goal };
  formResult: { [key: string]: string | boolean };
};

type CtrlCtxType = {
  state: CtrlCtxState;
  setState: Dispatch<SetStateAction<Partial<CtrlCtxState>>>;
};

const CtrlCtxStateDefaultVal: CtrlCtxType = {
  state: {
    user: undefined,
    curTime: moment(),
    ongoingGoals: {},
    formResult: {},
  },
  setState: () => {
    // Intentionally left blank
  },
};

const ControlContext = createContext(CtrlCtxStateDefaultVal);

export { ControlContext, CtrlCtxStateDefaultVal };
