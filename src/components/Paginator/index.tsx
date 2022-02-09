import React from 'react';
import classNames from 'classnames';
import './index.less';

export interface ButtonProps {
  page: any;
  onPage: (page: number) => void;
  isActive: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  page,
  onPage,
  isActive,
  className,
}: ButtonProps) => {
  const onClick = () => {
    onPage && onPage(page);
  };

  return (
    <div
      onClick={onClick}
      className={classNames('body-14-bold', {
        active: isActive,
        [`${className}`]: className,
      })}
    >
      {page}
    </div>
  );
};

export interface PaginatorProps {
  totalPages: number;
  currentPage: number;
  onPage: (page: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({
  totalPages,
  currentPage,
  onPage,
}: PaginatorProps) => {
  if (currentPage < 1) {
    currentPage = 1;
  }

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const max = 5;

  const handlePrev = () => {
    if (totalPages && currentPage === 0) return;

    onPage && onPage(currentPage - 1);
  };

  const handleNext = () => {
    if (totalPages && currentPage + 1 > totalPages) return;

    onPage && onPage(currentPage + 1);
  };

  const handlePage = (page: number) => {
    onPage && currentPage !== page && onPage(page);
  };

  if (!totalPages) {
    return null;
  }

  const displayPrevDots = totalPages > max && currentPage > 1;
  const displayNextDots = totalPages > max && currentPage < totalPages - 1;
  const lastPage = totalPages;
  const firstPage = 1;
  const pageBufferSize = 2;
  const options = {
    from: Math.max(1, currentPage - pageBufferSize),
    to: Math.min(currentPage + pageBufferSize, totalPages),
  };
  if (totalPages <= 7) {
    options.from = 1;
    options.to = totalPages;
  } else {
    if (currentPage - 1 <= pageBufferSize) {
      options.to = 1 + pageBufferSize * 2;
    }

    if (totalPages - currentPage <= pageBufferSize) {
      options.from = totalPages - pageBufferSize * 2;
    }
  }

  return (
    <div className="Paginator">
      <Button
        page={
          <img alt="" src="/assets/images/ic-arrow.png" className="icon-prev" />
        }
        onPage={handlePrev}
        isActive
        className={classNames('prev', { 'arrow-disabled': currentPage === 1 })}
      />

      <div className="number">
        {options.from !== 1 && totalPages > 7 && (
          <Button
            page={firstPage}
            onPage={handlePage}
            isActive={false}
            className="pagesNumber body-14-bold"
          />
        )}

        {totalPages < max
          ? new Array(totalPages).fill('paginationItem').map((_, i) => {
              return (
                <Button
                  page={i}
                  onPage={handlePage}
                  key={`$pagination-${i + options.from}`}
                  isActive={i === currentPage}
                  className="pagesNumber body-14-bold"
                />
              );
            })
          : new Array(options.to - options.from + 1)
              .fill('paginationItem')
              .map((_, i) => {
                return (
                  <Button
                    page={i + options.from}
                    onPage={handlePage}
                    key={`$pagination-${i + options.from}`}
                    isActive={i + options.from === currentPage}
                    className="pagesNumber body-14-bold"
                  />
                );
              })}

        {options.to !== totalPages && (
          <Button
            page={lastPage}
            onPage={handlePage}
            isActive={false}
            className="pagesNumber body-14-bold"
          />
        )}
      </div>

      <Button
        page={
          <img alt="" src="/assets/images/ic-arrow.png" className="icon-next" />
        }
        onPage={handleNext}
        isActive
        className={classNames('next', {
          'arrow-disabled': currentPage >= totalPages,
        })}
      />
    </div>
  );
};

export default Paginator;
