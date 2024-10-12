const Results = ({totalHits}) => {
    return (
        <div className="text-xs font-semibold">
            {totalHits} results (0.002 seconds)
        </div>
    )
}
export default Results;