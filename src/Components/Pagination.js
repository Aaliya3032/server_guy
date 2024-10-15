import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const siblings = 2; // Number of sibling pages to show
    const totalVisiblePages = siblings * 2 + 3; // Total pages to display including dots
    const startPage = Math.max(2, currentPage - siblings); // Start page
    const endPage = Math.min(totalPages - 1, currentPage + siblings); // End page

    let pages = [];

    // Add the first page
    pages.push(1);

    // Add dots if needed
    if (startPage > 2) {
        pages.push('...');
    }

    // Add the range of pages
    for (let i = startPage; i <= endPage-1; i++) {
        pages.push(i);
    }

    // Add dots if needed
    if (endPage < totalPages - 1) {
        pages.push('...');
    }

    // Add the last page
    if (totalPages > 1) {
        pages.push(totalPages-1);
    }

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page !== '...') {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-content-center space-x-2">
            <button
                className={`px-4 py-2 border rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ff742b] hover:text-white'}`}
                disabled={currentPage === 0}
                onClick={() => onPageChange(0)}
            >
                {'<<'}
            </button>
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 border rounded ${currentPage === page ? 'bg-[#ff742b] text-white' : 'hover:bg-orange-300'}`}
                >
                    {page}
                </button>
            ))}
            <button
                className={`px-4 py-2 border rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ff742b] hover:text-white'}`}
                disabled={currentPage === totalPages-1}
                onClick={() => onPageChange(totalPages-1)}
            >
                {'>>'}
            </button>
        </div>
    );
};

export default Pagination;
