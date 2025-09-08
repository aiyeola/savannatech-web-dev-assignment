import { memo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface UserTablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const UserTablePagination = memo<UserTablePaginationProps>(({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (!totalPages || totalPages <= 1) return null;

  const renderComplexPagination = () => (
    <>
      {/* First page */}
      <PaginationItem>
        <PaginationLink
          onClick={() => onPageChange(0)}
          isActive={currentPage === 0}
        >
          1
        </PaginationLink>
      </PaginationItem>
      
      {/* Ellipsis before */}
      {currentPage > 3 && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      
      {/* Middle pages */}
      {(() => {
        let start = Math.max(1, currentPage - 1);
        let end = Math.min(totalPages - 2, currentPage + 1);
        
        if (currentPage <= 2) {
          end = 3;
          start = 1;
        } else if (currentPage >= totalPages - 3) {
          end = totalPages - 2;
          start = totalPages - 4;
        }
        
        start = Math.max(1, start);
        end = Math.min(totalPages - 2, end);

        return Array.from({ length: end - start + 1 }, (_, idx) => {
          const page = start + idx;
          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
              >
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          );
        });
      })()}
      
      {/* Ellipsis after */}
      {currentPage < totalPages - 4 && (
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
      )}
      
      {/* Last page */}
      <PaginationItem>
        <PaginationLink
          onClick={() => onPageChange(totalPages - 1)}
          isActive={currentPage === totalPages - 1}
        >
          {totalPages}
        </PaginationLink>
      </PaginationItem>
    </>
  );

  const renderSimplePagination = () =>
    Array.from({ length: totalPages }, (_, i) => (
      <PaginationItem key={i}>
        <PaginationLink
          onClick={() => onPageChange(i)}
          isActive={i === currentPage}
        >
          {i + 1}
        </PaginationLink>
      </PaginationItem>
    ));

  return (
    <Pagination className="justify-end mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={currentPage === 0 ? undefined : () => onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 0}
          />
        </PaginationItem>
        
        {totalPages > 7 ? renderComplexPagination() : renderSimplePagination()}
        
        <PaginationItem>
          <PaginationNext
            onClick={
              currentPage === totalPages - 1
                ? undefined
                : () => onPageChange(currentPage + 1)
            }
            aria-disabled={currentPage === totalPages - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
});

UserTablePagination.displayName = "UserTablePagination";

export default UserTablePagination;