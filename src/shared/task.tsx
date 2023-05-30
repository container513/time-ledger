import { UUID, randomUUID } from "crypto";

import Schedule from "./schedule";

class Task {
  static readonly type: string = "task";
  id: UUID;
  parentId: UUID;
  name: string;
  schedules: Schedule[];
  accumMsec: number;
  isClosed: boolean;

  constructor(
    name: string,
    parentId: UUID,
    schedules: Schedule[] = [],
    accumMsec: number = 0,
    isClosed: boolean = false,
    id?: UUID
  ) {
    this.id = id !== undefined ? id : randomUUID();
    this.parentId = parentId;
    this.name = name;
    this.schedules = schedules;
    this.accumMsec = accumMsec;
    this.isClosed = isClosed;
  }
}

export default Task;
