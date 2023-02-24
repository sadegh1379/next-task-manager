//@ts-ignore
import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  changeStatus,
  filterByCompleted,
  removeTask,
  reorderTasks,
  searchTask,
} from "../redux/task.slice";
import update from "immutability-helper";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";
import TaskFilter from "./TaskFilter";

type TTask = {
  tasks: Task[];
  filteredTasks: [];
};

const Tasks: FC = () => {
  const dispatch = useDispatch();
  const { tasks, filteredTasks }: TTask = useSelector((state: any) => state.task);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  // filters
  const [status, setStatus] = useState<string>("all");
  const [search, setSearch] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<boolean>(false);

  const handleAddTask = () => {
    if (!title || !description) return;
    dispatch(
      addTask({
        title,
        description,
        isCompleted: false,
        id: `${tasks.length + 1}`,
      })
    );
    setTitle("");
    setDescription("");
  };

  const handleRemoveTask = (id: string) => {
    dispatch(removeTask(id));
  };

  const handleChangeStatus = (id: string) => {
    dispatch(changeStatus(id));
    if (status !== 'all') {
      handleStatusFilterChange(status);
    }
  };

  const findTask = useCallback(
    (id: string) => {
      const task = tasks.filter((t) => `${t.id}` === id)[0] as Task;
      return {
        task,
        index: tasks.indexOf(task),
      };
    },
    [tasks]
  );
  const moveTask = useCallback(
    (id: string, atIndex: number) => {
      const { task, index } = findTask(id);
      dispatch(
        reorderTasks(
          update(tasks, {
            $splice: [
              [index, 1],
              [atIndex, 0, task],
            ],
          })
        )
      );
    },
    [findTask, tasks, reorderTasks]
  );

  const handleStatusFilterChange = (value: string) => {
    setStatus(value)
    if(value === 'all') {
      setActiveFilter(false);
    } else {
      setActiveFilter(true);
      dispatch(filterByCompleted(value))
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value);
    if(value) {
      setActiveFilter(true);
      dispatch(searchTask(value));
    } else {
      setActiveFilter(false);
    }
  }
  const [, drop] = useDrop(() => ({ accept: "task" }));

  const taskData = activeFilter ? filteredTasks : tasks;
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 w-full m-10">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="mt-4 flex flex-col gap-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
              placeholder="Add Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={handleAddTask}
              className="p-2 w-full border-2 rounded text-teal border-teal"
            >
              Add
            </button>
          </div>
        </div>
        <div>
          <TaskFilter status={status} setStatus={handleStatusFilterChange} setSearch={handleSearch} search={search}/>
        </div>
        <div className="">
          {taskData.map((task: Task) => (
            <TaskCard
              key={task.id}
              task={task}
              handleChangeStatus={handleChangeStatus}
              handleRemoveTask={handleRemoveTask}
              moveTask={moveTask}
              findTask={findTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
