/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";

type paginate = {
    totalPages: number,
    currentPage: number, 
    handlePageChange: any,
}

const PaginationComponent = ({totalPages, currentPage, handlePageChange}: paginate) => {




  const renderPaginationItems = () => {
    const paginationItems = [];

    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      paginationItems.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={() => handlePageChange(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (currentPage > 3) {
        paginationItems.push(<PaginationEllipsis key="ellipsis-start" />);
      }

      // Calculate the middle range of pages to show
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationItems.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === currentPage}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      if (currentPage < totalPages - 2) {
        paginationItems.push(<PaginationEllipsis key="ellipsis-end" />);
      }

      paginationItems.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return paginationItems;
  };

  return (
    <div className="flex justify-center items-center">
    <Pagination>
      <PaginationContent>{renderPaginationItems()}</PaginationContent>
    </Pagination>
  </div>
  );
};

export default PaginationComponent;
