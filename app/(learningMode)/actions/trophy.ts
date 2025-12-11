"use server";

import { TrophyApiClient } from "@trophyso/node";
import {
  CompletedAchievementResponse,
  GetUserPointsResponse,
  LeaderboardResponseWithRankings,
  PointsSummaryResponse,
  PointsSystemResponse,
  StreakResponse,
  User,
  UserLeaderboardResponse,
  UsersPointsEventSummaryResponseItem,
} from "@trophyso/node/api";
import {
  STEP_PASSED,
  LESSON_COMPLETED,
  MISTAKE,
  SUCCESS,
  POINTS_SYSTEM_KEY,
  LEADERBOARD_KEY,
  ENERGY_SYSTEM_KEY,
  POINTS_TO_CELLS,
  POINTS_TO_CELLS_MINIMUM,
} from "@/constants/trophy";

const trophy = new TrophyApiClient({
  apiKey: process.env.TROPHY_API_KEY!,
});

export async function lessonCompleted(userId: string) {
  try {
    return await trophy.metrics.event(LESSON_COMPLETED, {
      user: {
        id: userId,
      },
      value: 1,
    });
  } catch (error) {
    console.error(`Trophy metric error on ${LESSON_COMPLETED}`, error);
    return null;
  }
}

export async function stepPassed(userId: string) {
  try {
    return await trophy.metrics.event(STEP_PASSED, {
      user: {
        id: userId,
      },
      value: 1,
    });
  } catch (error) {
    console.error(`Trophy metric error on ${STEP_PASSED}`, error);
    return null;
  }
}

export async function getAchievements(
  userId: string,
  includeIncomplete: boolean = false
): Promise<CompletedAchievementResponse[] | null> {
  try {
    return await trophy.users.achievements(userId, {
      includeIncomplete: includeIncomplete ? "true" : undefined,
    });
  } catch (error) {
    console.error("Get achievements error:", error);
    return null;
  }
}

export async function getStreak(
  userId: string
): Promise<StreakResponse | null> {
  try {
    return await trophy.users.streak(userId, {
      historyPeriods: 14,
    });
  } catch (error) {
    console.error("Get streak error:", error);
    return null;
  }
}

export async function getPointsSystem(): Promise<PointsSystemResponse | null> {
  try {
    return await trophy.points.system(POINTS_SYSTEM_KEY);
  } catch (error) {
    console.error("Get points system error:", error);
    return null;
  }
}

export async function getUserPoints(
  userId: string
): Promise<GetUserPointsResponse | null> {
  try {
    return await trophy.users.points(userId, POINTS_SYSTEM_KEY);
  } catch (error) {
    console.error("Get user points error:", error);
    return null;
  }
}

export async function getPointsSummary(
  userId: string
): Promise<UsersPointsEventSummaryResponseItem[] | null> {
  try {
    const now = new Date();
    const endDate = now.toISOString().slice(0, 10);
    now.setDate(now.getDate() - 6);
    const startDate = now.toISOString().slice(0, 10);

    return await trophy.users.pointsEventSummary(userId, POINTS_SYSTEM_KEY, {
      aggregation: "daily",
      startDate,
      endDate,
    });
  } catch (error) {
    console.error("Get points summary error:", error);
    return null;
  }
}

export async function getOverallPointsSummary(): Promise<PointsSummaryResponse | null> {
  try {
    return await trophy.points.summary(POINTS_SYSTEM_KEY);
  } catch (error) {
    console.error("Get overall points summary error:", error);
    return null;
  }
}

export async function getLeaderboard(
  limit?: number,
  offset?: number,
  userId?: string,
  runDate?: string
): Promise<LeaderboardResponseWithRankings | null> {
  try {
    return await trophy.leaderboards.get(LEADERBOARD_KEY, {
      limit: limit || 10,
      offset: offset || 0,
      userId: userId || undefined,
      run: runDate || undefined,
    });
  } catch (error) {
    console.error("Get leaderboard error:", error);
    return null;
  }
}

export async function getUserLeaderboard(
  userId: string,
  run?: string
): Promise<UserLeaderboardResponse | null> {
  try {
    return await trophy.users.leaderboard(userId, LEADERBOARD_KEY, {
      run,
    });
  } catch (error) {
    console.error("Get user leaderboard error:", error);
    return null;
  }
}

export async function identifyUser(userId: string): Promise<User | null> {
  try {
    return await trophy.users.identify(userId, {
      tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  } catch (error) {
    console.error("Identify user error:", error);
    return null;
  }
}

export async function getEnergySystem(): Promise<PointsSystemResponse | null> {
  try {
    return await trophy.points.system(ENERGY_SYSTEM_KEY);
  } catch (error) {
    console.error("Get energy system error:", error);
    return null;
  }
}

export async function getUserEnergy(
  userId: string
): Promise<GetUserPointsResponse | null> {
  try {
    return await trophy.users.points(userId, ENERGY_SYSTEM_KEY);
  } catch (error) {
    console.error("Get user energy error:", error);
    return null;
  }
}

export async function quizFailed(userId: string) {
  try {
    return await trophy.metrics.event(MISTAKE, {
      user: {
        id: userId,
      },
      value: 1,
    });
  } catch (error) {
    console.error(`Trophy metric error on ${MISTAKE}`, error);
    return null;
  }
}

export async function quizPassed(userId: string) {
  try {
    return await trophy.metrics.event(SUCCESS, {
      user: {
        id: userId,
      },
      value: 1,
    });
  } catch (error) {
    console.error(`Trophy metric error on ${SUCCESS}`, error);
    return null;
  }
}
export async function getEnergySummary(
  userId: string
): Promise<UsersPointsEventSummaryResponseItem[] | null> {
  try {
    const now = new Date();
    const endDate = now.toISOString().slice(0, 10);
    now.setDate(now.getDate() - 6);
    const startDate = now.toISOString().slice(0, 10);

    return await trophy.users.pointsEventSummary(userId, ENERGY_SYSTEM_KEY, {
      aggregation: "daily",
      startDate,
      endDate,
    });
  } catch (error) {
    console.error("Get energy summary error:", error);
    return null;
  }
}

export async function refillCells(userId: string) {
  try {
    const points = await getUserPoints(userId);
    if (!points || points.total < POINTS_TO_CELLS_MINIMUM) return null;

    return await trophy.metrics.event(POINTS_TO_CELLS, {
      user: {
        id: userId,
      },
      value: 1,
    });
  } catch (error) {
    console.error(`Trophy metric error on ${POINTS_TO_CELLS}`, error);
    return null;
  }
}
