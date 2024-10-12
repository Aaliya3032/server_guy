import { useEffect, useState } from "react";
import Header from "../Components/Header";
import ItemList from "../Components/ItemList";
import LogoutBtn from "../Components/LogoutBtn";
import { fetchStories } from "../Services/apiService";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const hitsPerPage = 30;
  const [filters, setFilters] = useState({
    searchBy: "all",
    sortBy: "popularity",
    timeRange: "allTime",
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query)
    setPage(0)
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
    getStories();
  }, [page, filters, searchQuery]);

  if (loading) return <h1 className="text-[#ff742b] flex justify-center text-5xl items-center mt-32">Loading Hacker News...</h1>
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-5xl mx-auto bg-[#f6f6ef] mb-8">
      <Header onSearch={handleSearchChange} />
      <ItemList
        stories={stories}
        totalHits={totalHits}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
        onFilterChange={handleFilterChange}
      />
      <LogoutBtn />
    </div>
  );
};
export default Home;
