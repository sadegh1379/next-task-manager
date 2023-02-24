import { createSlice } from "@reduxjs/toolkit";

type TState = {
  tasks: Task[];
  filteredTasks: Task[];
};

const INITIAL_STATE: TState = {
  tasks: [
    {
      title: "sadegh",
      description: "sadegh description",
      isCompleted: false,
      id: "1",
    },
    {
      title: "ali",
      description: "ali description",
      isCompleted: true,
      id: "2",
    },
  ],
  filteredTasks: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState: INITIAL_STATE,
  reducers: {
    reorderTasks: (state: TState, action: { payload: Task[] }) => {
      state.tasks = action.payload;
    },
    addTask: (state: TState, action: { payload: Task }) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTask: (state: TState, action: { payload: string }) => {
      const newTasks = state.tasks.filter((t) => t.id !== action.payload);
      state.tasks = newTasks;
    },
    changeStatus: (state: TState, action: { payload: string }) => {
      const newTasks = state.tasks.map((t) => {
        if (t.id === action.payload) {
          t.isCompleted = !t.isCompleted;
        }
        return t;
      });
      const newFilterdTasks = state.filteredTasks.map((t) => {
        if (t.id === action.payload) {
          t.isCompleted = !t.isCompleted;
        }
        return t;
      });
      state.tasks = newTasks;
      state.filteredTasks = newFilterdTasks;
    },
    filterByCompleted: (state: TState, action: { payload: string }) => {
      // c => completed
      // n => in progress
      if (action.payload === "c") {
        let newTasks = state.tasks.filter((t) => t.isCompleted === true);
        state.filteredTasks = newTasks;
      } else if (action.payload === "n") {
        let newTasks = state.tasks.filter((t) => t.isCompleted === false);
        state.filteredTasks = newTasks;
      } else {
        state.filteredTasks = [];
      }
    },
    searchTask: (state: TState, action: { payload: string }) => {
      // c => completed
      // n => in progress
      if (action.payload) {
        let newTasks = state.tasks.filter(
          (t) =>
            t.title.includes(action.payload) ||
            t.description.includes(action.payload)
        );
        state.filteredTasks = newTasks;
      } else {
        state.filteredTasks = [];
      }
    },
  },
});

export const {
  addTask,
  removeTask,
  changeStatus,
  reorderTasks,
  filterByCompleted,
  searchTask,
} = taskSlice.actions;
export default taskSlice.reducer;
