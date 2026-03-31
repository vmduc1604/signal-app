export type PomodoroSession = {
  id: number;
  startTime: Date;
  endTime: Date;
  completed: boolean;
};

export type PomodoroSettings = {
  sessionLength: number; // in seconds
  breakLength: number; // in seconds
};
