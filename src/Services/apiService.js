import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

//fetch based on search query
export const fetchStories = async (
  page = 0,
  hitsPerPage = 30,
  searchQuery = "",
  searchBy,
  sortBy,
  timeRange
) => {
  try {
    const params = {
      query: searchQuery,
      page: page,
      hitsPerPage: hitsPerPage,
      tags: searchBy !== "all" ? searchBy : undefined,
      numericFilters: getTimeRangeFilter(timeRange),
    };
    const endpoint =
    sortBy === "date"
    ? `${API_BASE_URL}/search_by_date`
    : `${API_BASE_URL}/search`; 

    const response = await axios.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching stories:", error);
    throw error;
  }
};

//for time ranges
const getTimeRangeFilter = (timeRange) => {
    const currentTime = Math.floor(Date.now() / 1000);
    switch (timeRange) {
      case "last24h":
        return `created_at_i>${currentTime - 24 * 60 * 60}`;
      case "pastWeek":
        return `created_at_i>${currentTime - 7 * 24 * 60 * 60}`;
      case "pastMonth":
        return `created_at_i>${currentTime - 30 * 24 * 60 * 60}`;
      case "pastYear":
        return `created_at_i>${currentTime - 365 * 24 * 60 * 60}`;
      case "custom":
        return "";
      default:
        return "";
    }
  };

//fetch based on ID
export const fetchById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    throw error;
  }
};

//fetch based on username
export const fetchByUsername = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching story by username:", error);
    throw error;
  }
};
