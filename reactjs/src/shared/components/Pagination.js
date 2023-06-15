import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Pagination = ({ pages }) => {
  const { total, limit, currentPage, next, prev, hasNext, hasPrev } = pages;
  const totalPages = Math.ceil(total / limit);
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const formatUrl = (page) => {
    return `${pathname}?keyword=${searchParams.get('keyword')}&page=${page}`;
  };

  const renderPagesHTML = (delta = 2) => {
    const pages = [];
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <div id="pagination">
      <ul className="pagination">
        {hasPrev ? (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(prev)}>
              Trang trước
            </Link>
          </li>
        ) : null}
        {renderPagesHTML().map((page, index) => (
          <li
            className={`page-item ${page===currentPage && 'active'}`}
            key={index}
          >
            <Link className="page-link" to={formatUrl(page)}>
              {page}
            </Link>
          </li>
        ))}
        {hasNext ? (
          <li className="page-item">
            <Link className="page-link" to={formatUrl(next)}>
              Trang sau
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Pagination;
