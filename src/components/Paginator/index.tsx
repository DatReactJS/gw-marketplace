import Icon from '../Icon';
import React from 'react';
import './index.less';
import classNames from 'classnames';

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

const screenWidth: number = window.innerWidth;

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
  if (currentPage < 0) {
    currentPage = 0;
  }

  if (currentPage >= totalPages) {
    currentPage = totalPages - 1;
  }

  const max = 5;

  const handlePrev = () => {
    if (totalPages && currentPage === 0) return;

    onPage && onPage(currentPage - 1);
  };

  const handleNext = () => {
    if (totalPages && currentPage + 1 > totalPages - 1) return;

    onPage && onPage(currentPage + 1);
  };

  const handlePage = (page: number) => {
    onPage && currentPage !== page - 1 && onPage(page - 1);
  };

  if (!totalPages) {
    return null;
  }

  const displayPrevDots = totalPages > max && currentPage > 1;
  const displayNextDots = totalPages > max && currentPage < totalPages - 1;
  const lastPage = totalPages;
  const options = {
    from: currentPage,
    to: currentPage + max,
  };

  if (currentPage + max > totalPages) {
    options.from = totalPages - max;
    options.to = totalPages;
  }

  console.log('totalPages', totalPages, 'max', max);

  return (
    <div className="Paginator">
      <Button
        page={
          <img alt="" src="/assets/images/ic-arrow.png" className="icon-prev" />
        }
        onPage={handlePrev}
        isActive
        className={classNames('prev', { 'arrow-disabled': currentPage === 0 })}
      />

      <div className="number">
        {screenWidth > 414 && (
          <>
            {totalPages > 5 && displayPrevDots && (
              <div className="ellipsis">
                <span>...</span>
              </div>
            )}
          </>
        )}

        {totalPages < max
          ? new Array(totalPages)
              .fill('paginationItem')
              .map((_, i) => (
                <Button
                  page={i + 1}
                  onPage={handlePage}
                  key={`$pagination-${i + options.from}`}
                  isActive={i === currentPage}
                  className="pagesNumber body-14-bold"
                />
              ))
          : new Array(options.to - options.from)
              .fill('paginationItem')
              .map((_, i) => (
                <Button
                  page={i + options.from + 1}
                  onPage={handlePage}
                  key={`$pagination-${i + options.from}`}
                  isActive={i + options.from === currentPage}
                  className="pagesNumber body-14-bold"
                />
              ))}

        {screenWidth > 414 && (
          <>
            {currentPage < totalPages - max && lastPage && displayNextDots && (
              <div className="ellipsis">
                <span>...</span>
              </div>
            )}
          </>
        )}

        {currentPage < totalPages - max && lastPage && displayNextDots && (
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
          'arrow-disabled': currentPage >= totalPages - 1,
        })}
      />
    </div>
  );
};

export default Paginator;
