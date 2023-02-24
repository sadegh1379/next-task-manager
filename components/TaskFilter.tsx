import React from "react";

type TProp = {
  setStatus: (value: string) => any;
  setSearch: (value: string) => any;
  search: string;
  status: string;
};
const TaskFilter = ({ status, setStatus, search, setSearch }: TProp) => {
  return (
    <div className="flex justify-between items-center py-3 gap-5">
      <div className="w-full">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium">
          status
        </label>
        <select
          id="countries"
          className=" w-full shadow appearance-none border rounded py-2 px-3 mr-4 text-grey-darker"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">all</option>
          <option value="c">Completed</option>
          <option value="n">In Progress</option>
        </select>
      </div>
      <div className="w-full">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium">
          Search
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TaskFilter;
