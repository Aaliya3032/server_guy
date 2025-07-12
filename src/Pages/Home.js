import { useEffect, useRef, useState } from "react";
import Header from "../Components/Header";
import ItemList from "../Components/ItemList";
import { useSearchParams } from "react-router-dom";
import LogoutBtn from "../Components/LogoutBtn";
import { fetchStories } from "../Services/apiService";

const Home = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const hitsPerPage = 30;
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 0;
  const filters = {
    searchBy: searchParams.get("searchBy") || "all",
    sortBy: searchParams.get("sortBy") || "popularity",
    timeRange: searchParams.get("timeRange") || "allTime",
  };

  const prevParamsRef = useRef({});

  useEffect(() => {
    if (!searchParams.get("query") && !searchParams.get("page")) {
      setSearchParams({
        query: searchQuery || "",
        page: 0,
        searchBy: filters.searchBy,
        sortBy: filters.sortBy,
        timeRange: filters.timeRange,
      });
    }
  }, [searchParams, setSearchParams]);

  const handleFilterChange = (newFilters) => { 
    setSearchParams({
      query: searchQuery,
      page: 0,
      searchBy: newFilters.searchBy,
      sortBy: newFilters.sortBy,
      timeRange: newFilters.timeRange,
    });
  };

  const handleSearchChange = (query) => {
    setSearchParams({ query, page: 0, searchBy: filters.searchBy, sortBy: filters.sortBy, timeRange: filters.timeRange });
  }

  useEffect(() => {
    const getStories = async () => {
      try {
        const data = await fetchStories(
          page,
          hitsPerPage,
          searchQuery,
          filters.searchBy,
          filters.sortBy,
          filters.timeRange
        );
        setStories(data.hits);
        setTotalPages(data.nbPages);
        setTotalHits(data.nbHits);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    if (
      prevParamsRef.current.query !== searchQuery ||
      prevParamsRef.current.page !== page ||
      prevParamsRef.current.filters !== filters
    ){
      getStories();
      prevParamsRef.current = { query: searchQuery, page, filters }; 
    }
  }, [page, searchQuery ,filters.searchBy, filters.sortBy, filters.timeRange]);

  const setPage = (newPage) => {
    setSearchParams({ 
      page: newPage,
      query: searchQuery,
      searchBy: filters.searchBy,
      sortBy: filters.sortBy,
      timeRange: filters.timeRange, })
    }

  if (loading) return <h1 className="text-[#ff742b] flex justify-center text-5xl items-center mt-32">Loading Hacker News...</h1>
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto bg-[#f6f6ef] mb-8">
      <Header onSearch={handleSearchChange} searchQuery={searchQuery}/>
      <ItemList
        stories={stories}
        totalHits={totalHits}
        page={page}
        filters={filters}
        totalPages={totalPages}
        setPage={setPage}
        searchQuery={searchQuery}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};
export default Home;
