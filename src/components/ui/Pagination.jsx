import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  showFirstLast = true,
  showPrevNext = true,
  maxVisiblePages = 5,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageButton = (page, isActive = false, isDisabled = false) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      disabled={isDisabled}
      className={`
        px-3 py-2 text-sm font-medium rounded-md transition-colors
        ${isActive
          ? 'bg-primary-600 text-white'
          : 'text-secondary-700 bg-white border border-secondary-300 hover:bg-secondary-50'
        }
        ${isDisabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:border-primary-300'
        }
      `}
    >
      {page}
    </button>
  );

  const renderEllipsis = (key) => (
    <span
      key={key}
      className="px-3 py-2 text-secondary-400"
    >
      <MoreHorizontal size={16} />
    </span>
  );

  return (
    <nav className={`flex items-center justify-center space-x-1 ${className}`}>
      {/* First page */}
      {showFirstLast && currentPage > 1 && (
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 text-sm font-medium text-secondary-700 bg-white border border-secondary-300 rounded-md hover:bg-secondary-50 hover:border-primary-300 transition-colors"
        >
          First
        </button>
      )}

      {/* Previous page */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 text-sm font-medium rounded-md transition-colors
            ${currentPage === 1
              ? 'opacity-50 cursor-not-allowed text-secondary-400 bg-white border border-secondary-300'
              : 'text-secondary-700 bg-white border border-secondary-300 hover:bg-secondary-50 hover:border-primary-300'
            }
          `}
        >
          <ChevronLeft size={16} />
        </button>
      )}

      {/* Page numbers */}
      {visiblePages.map((page, index) => {
        const isActive = page === currentPage;
        
        // Show ellipsis before first visible page if there are hidden pages
        if (index === 0 && page > 1) {
          return (
            <React.Fragment key={`ellipsis-start-${page}`}>
              {renderEllipsis(`ellipsis-start-${page}`)}
              {renderPageButton(page, isActive)}
            </React.Fragment>
          );
        }
        
        // Show ellipsis after last visible page if there are hidden pages
        if (index === visiblePages.length - 1 && page < totalPages) {
          return (
            <React.Fragment key={`ellipsis-end-${page}`}>
              {renderPageButton(page, isActive)}
              {renderEllipsis(`ellipsis-end-${page}`)}
            </React.Fragment>
          );
        }
        
        return renderPageButton(page, isActive);
      })}

      {/* Next page */}
      {showPrevNext && (
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 text-sm font-medium rounded-md transition-colors
            ${currentPage === totalPages
              ? 'opacity-50 cursor-not-allowed text-secondary-400 bg-white border border-secondary-300'
              : 'text-secondary-700 bg-white border border-secondary-300 hover:bg-secondary-50 hover:border-primary-300'
            }
          `}
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Last page */}
      {showFirstLast && currentPage < totalPages && (
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 text-sm font-medium text-secondary-700 bg-white border border-secondary-300 rounded-md hover:bg-secondary-50 hover:border-primary-300 transition-colors"
        >
          Last
        </button>
      )}
    </nav>
  );
};

export default Pagination; 