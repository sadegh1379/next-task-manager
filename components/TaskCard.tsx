import React, { FC } from "react";
import { useDrag, useDrop } from "react-dnd";

type TProp = {
  task: Task;
  handleChangeStatus: (id: string) => void;
  handleRemoveTask: (id: string) => void;
  findTask: (id: string) => any;
  moveTask: (id: string, atIndex: number) => void;
};

interface Item {
  id: string;
  originalIndex: number;
}

const TaskCard = ({
  task,
  handleChangeStatus,
  handleRemoveTask,
  findTask,
  moveTask,
}: TProp) => {
  const originalIndex = findTask(task.id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: { id: task.id, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          moveTask(droppedId, originalIndex);
        }
      },
    }),
    [task.id, originalIndex, moveTask]
  );

  const [_, drop] = useDrop(
    () => ({
      accept: "task",
      hover({ id: draggedId }: Item) {
        if (draggedId !== task.id) {
          const { index: overIndex } = findTask(task.id);
          moveTask(draggedId, overIndex);
        }
      },
    }),
    [findTask, moveTask]
  );
  const opacity = isDragging ? 0.3 : 1;
  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: opacity }}
      key={task.id}
      className={`flex mb-4 items-center border-2 border-orange-400 rounded-md my-1 p-3`}
    >
      <p className="w-full text-gray-800 font-semibold">{task.title}</p>
      {!task.isCompleted ? (
        <p className="flex whitespace-nowrap">
          In progress
        </p>
      ) : (
        <p>
          Completed
        </p>
      )}
      {task.isCompleted ? (
        <button
          onClick={() => handleChangeStatus(task.id)}
          className="flex whitespace-nowrap flex-nowrap p-2 ml-2 border-2 rounded  border-orange-500"
        >
          In progress
        </button>
      ) : (
        <button
          onClick={() => handleChangeStatus(task.id)}
          className="flex p-2 ml-2 border-2 rounded  border-green-500"
        >
          Completed
        </button>
      )}
      <button
        onClick={() => handleRemoveTask(task.id)}
        className="flex-no-shrink p-2 ml-2 border-2 rounded  border-red-500"
      >
        Remove
      </button>
    </div>
  );
};

export default TaskCard;
