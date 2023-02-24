import { configureStore } from "@reduxjs/toolkit"; //create react app redux toolkit
import taskReducer from "./task.slice"; //import our reducer from step 4
export default configureStore({
  reducer: {
    task: taskReducer, //add our reducer from step 4
  },
});
