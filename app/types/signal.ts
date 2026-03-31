export type Signal = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  tag?: string;
};

export type SignalForm = {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  tag?: string;
};
