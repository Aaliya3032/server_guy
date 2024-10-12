import Listheader from "./ListHeader";
import {Link} from 'react-router-dom'
import Pagination from "./Pagination";
import { format } from "timeago.js";

const ItemList = ({
  stories,
  page,
  totalPages,
  setPage,
  onFilterChange,
  totalHits,
}) => {
 
  return (
    <div>
      <div className="h-10">
        <Listheader
          onFilterChange={onFilterChange}
          stories={stories}
          totalHits={totalHits}
        />
      </div>
      <div>
        <ul>
          {stories.map((story) => (
            <li key={story.objectID} className="mb-2 ml-4">
              <div>
                {story.title} 
                { story.url &&
                <a href={story.url} className="text-[#696969]">
                  ({story.url})
                </a> }
              </div>
              <div>
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
