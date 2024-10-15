import { useEffect, useState } from "react";

const Filters = ({ onFilterChange,currentFilters }) => {
  const [searchBy, setSearchBy] = useState(currentFilters.searchBy);
  const [sortBy, setSortBy] = useState(currentFilters.sortBy);
  const [timeRange, setTimeRange] = useState(currentFilters.timeRange);

  useEffect(() => {
    setSearchBy(currentFilters.searchBy);
    setSortBy(currentFilters.sortBy);
    setTimeRange(currentFilters.timeRange);
  }, [currentFilters]);

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
    onFilterChange({ searchBy: e.target.value, sortBy, timeRange });
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    onFilterChange({ searchBy, sortBy: e.target.value, timeRange });
  };

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
    onFilterChange({ searchBy, sortBy, timeRange: e.target.value });
  };

  return (
    <div className="flex gap-2 ml-2">
      <label>
        Search 
      <select value={searchBy} onChange={handleSearchByChange} className="bg-[#f6f6ef] border border-gray-300 text-gray-500 text-sm rounded-sm h-6">
        <option value="all">All</option>
        <option value="story">Stories</option>
        <option value="comment">Comments</option>
        <option value="ask_hn">Ask HN</option>
        <option value="show_hn">Show HN</option>
        <option value="launch_hn">Launch HN</option>
        <option value="job">Jobs</option>
        <option value="poll">Polls</option>
      </select>
      </label>
      <label>
        by 
      <select value={sortBy} onChange={handleSortByChange} className="bg-[#f6f6ef] border border-gray-300 text-gray-500 text-sm rounded-sm h-6">
        <option value="popularity">By Popularity</option>
        <option value="date">By Date</option>
      </select>
      </label>
      <label>
        for 
      <select value={timeRange} onChange={handleTimeRangeChange} className="bg-[#f6f6ef] border border-gray-300 text-gray-500 text-sm rounded-sm h-6">
        <option value="allTime">All Time</option>
        <option value="last24h">Last 24h</option>
        <option value="pastWeek">Past Week</option>
        <option value="pastMonth">Past Month</option>
        <option value="pastYear">Past Year</option>
        <option value="custom">Custom Range</option>
      </select>
      </label>
    </div>
  );
};
export default Filters;
