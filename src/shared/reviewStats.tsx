import moment, { Moment, Duration } from "moment";

interface Reviewable {
  id: string;
  name: string;
  isClosed: boolean;
  getReviewStats: () => ReviewStats;
}

class ReviewStats {
  id: string;
  name: string;
  actualEffort: Duration;
  startDate: Moment | undefined;
  endDate: Moment | undefined;
  isClosed: boolean;
  constructor(reviewable: Reviewable) {
    this.id = reviewable.id;
    this.name = reviewable.name;
    this.actualEffort = moment.duration(0);
    this.startDate = undefined;
    this.endDate = undefined;
    this.isClosed = reviewable.isClosed;
  }
  static aggregateReviewStats(
    reviewable: Reviewable,
    childRevStats: ReviewStats[]
  ) {
    const revStats = new ReviewStats(reviewable);
    if (childRevStats.length > 0) {
      revStats.actualEffort = childRevStats.reduce(
        (acc: Duration, childRevStat: ReviewStats) => {
          return acc.add(childRevStat.actualEffort);
        },
        moment.duration(0)
      );
      revStats.startDate = moment.min(
        childRevStats
          .filter((childStat) => childStat.startDate !== undefined)
          .map((childStat) => childStat.startDate as Moment)
      );
      revStats.endDate = moment.max(
        childRevStats
          .filter((childStat) => childStat.endDate !== undefined)
          .map((childStat) => childStat.endDate as Moment)
      );
    }
    return revStats;
  }
}

export { ReviewStats };
export type { Reviewable };
