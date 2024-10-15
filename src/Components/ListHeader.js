import Filters from "./Filters";
import Results from "./Results";

const Listheader = ({onFilterChange,stories,totalHits,filters}) => {
    return (
        <div className="flex justify-between">
            <div className="mt-2">
            <Filters onFilterChange={onFilterChange} currentFilters={filters}/>
            </div>
            <div className="mr-4 mt-3">
            <Results totalHits={totalHits}/>
            </div>
        </div>
    )
}
export default Listheader;