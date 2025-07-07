type Props = {
  totalPages: number;
  currentPage: number;
  handleNextPage: (pageNumber: number) => void;
};
const ShopPagination = ({ totalPages, currentPage, handleNextPage }: Props) => {
  return (
    <nav className="rv-shop-pagination">
      <ul className="page-numbers">
        {Array.from({ length: totalPages }, (_, index) => (
          <li key={index + 1}>
            <a
              className={`page-number-btn ${
                currentPage === index + 1 ? "current" : ""
              }`}
              role="button"
              onClick={() => handleNextPage(index + 1)}
              aria-disabled={currentPage === index + 1}
            >
              <span aria-current="page" className="page-number">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </span>
            </a>
          </li>
        ))}

        <li>
          <a
            className={`page-number-btn ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            role="button"
            onClick={() => {
              if (currentPage < totalPages) {
                handleNextPage(currentPage + 1);
              }
            }}
            aria-disabled={currentPage === totalPages}
          >
            <span aria-current="page" className="last-page">
              <i className="fa-light fa-angle-right"> </i>
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default ShopPagination;
