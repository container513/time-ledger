import { UUID, randomUUID } from "crypto";

import Schedule from "./schedule";

class Task {
  static readonly type: string = "task";
  id: UUID;
  parentId: UUID;
  name: string;
  schedules: Schedule[];
  accumMillisec: number;
  isClosed: boolean;

  constructor(
    name: string,
    parentId: UUID,
    schedules: Schedule[] = [],
    accumMillisec: number = 0,
    isClosed: boolean = false,
    id?: UUID
  ) {
    this.id = id !== undefined ? id : randomUUID();
    this.parentId = parentId;
    this.name = name;
    this.schedules = schedules;
    this.accumMillisec = accumMillisec;
    this.isClosed = isClosed;
  }
}

export default Task;
