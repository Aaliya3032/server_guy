import Listheader from "./ListHeader";
import {Link} from 'react-router-dom'
import Pagination from "./Pagination";
import { format } from "timeago.js";

const ItemList = ({
  stories,
  page,
  searchQuery,
  filters,
  totalPages,
  setPage,
  onFilterChange,
  totalHits,
}) => {

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? 
      <span key={index} className="bg-yellow-300 font-semibold">{part}</span> : part
    );
  };

 
  return (
    <div>
      <div className="h-10">
        <Listheader
          onFilterChange={onFilterChange}
          filters={filters}
          stories={stories}
          totalHits={totalHits}
        />
      </div>
      <div>
        <ul>
          {stories.map((story) => (
            <li key={story.objectID} className="mb-2 ml-4">
              <div>
                {highlightText(story.title, searchQuery)} 
                {story.url && (
                  <a href={story.url} className="text-[#696969]">
                    {/* Highlight the URL */}
                    ({highlightText(story.url, searchQuery)})
                  </a>
                )}
              </div>
              <div >
                <Link className="text-[#696969]" to={`/user/${story.author}`}>
                  {story.points} points | {story.author} |{" "}
                  {format(story.created_at)} | {story.num_comments} comments
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};
export default ItemList;
