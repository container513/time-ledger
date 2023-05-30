import { UUID } from "crypto";

import Schedule from "./schedule";

class Task {
  id: UUID;
  parentId: UUID;
  name: string;
  schedules: Schedule[];
  accumMillisec: number;
  isClosed: boolean;

  constructor(
    id: UUID,
    parentId: UUID,
    name: string,
    schedules: Schedule[],
    accumMillisec: number,
    isClosed: boolean
  ) {
    this.id = id;
    this.parentId = parentId;
    this.name = name;
    this.schedules = schedules;
    this.accumMillisec = accumMillisec;
    this.isClosed = isClosed;
  }
}

export default Task;
