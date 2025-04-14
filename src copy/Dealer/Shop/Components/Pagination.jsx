const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const createPageArray = () => {
    let pages = [];
    if (totalPages <= 5) {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [
          1,
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        ];
      } else {
        pages = [1, currentPage - 1, currentPage, currentPage + 1, totalPages];
      }
      pages = [...new Set(pages)];
      if (pages[1] > 2) pages.splice(1, 0, "...");
      if (pages[pages.length - 2] < totalPages - 1)
        pages.splice(pages.length - 1, 0, "...");
    }
    return pages;
  };

  const pages = createPageArray();

  return (
    <div className="flex justify-center mt-8 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &lt;
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`mx-1 sm:mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded ${
            typeof page === "number" && page === currentPage
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-2 px-2 sm:px-4 py-1 sm:py-2 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
