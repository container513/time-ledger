import { v4 as uuid } from "uuid";

import Schedule from "./schedule";

class Task {
  static readonly type: string = "task";
  id: string;
  parentId: string;
  name: string;
  schedules: Schedule[];
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    parentId: string,
    schedules: Schedule[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id?: string
  ) {
    this.id = id !== undefined ? id : uuid();
    this.parentId = parentId;
    this.name = name;
    this.schedules = schedules;
    this.accumMsec = accumMsec;
    this.isClosed = isClosed;
  }
}

export default Task;
