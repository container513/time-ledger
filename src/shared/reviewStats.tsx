import moment, { Moment, Duration } from "moment";

interface Reviewable {
  id: string;
  name: string;
  getReviewStats: () => ReviewStats;
}

class ReviewStats {
  id: string;
  name: string;
  actualEffort: Duration;
  startDate: Moment | undefined;
  endDate: Moment | undefined;
  constructor(entity: Reviewable) {
    this.id = entity.id;
    this.name = entity.name;
    this.actualEffort = moment.duration(0);
    this.startDate = undefined;
    this.endDate = undefined;
  }
}

export { ReviewStats };
export type { Reviewable };
