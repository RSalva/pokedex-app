function Pagination({ onPageChange, page }) {
  return (
    <nav aria-label="..." className={"align-middle"}>
      <ul className={"pagination"}>
        <li className={page <= 0 ? "page-item disabled" : "page-item"}>
          <button className={"page-link"} onClick={() => onPageChange(page - 1) }>
            Previous
          </button>
        </li>
        <li className={page <= 0 ? "page-item active" : "page-item"}>
          <button className={"page-link"} onClick={() => onPageChange(page - 1) } >
            {page <= 0 && page <= 1 ? 1 : page}
          </button>
        </li>
        <li className={page > 0 ? "page-item active" : "page-item"} >
          <button className={"page-link"} onClick={() => onPageChange(page) } >
            {page <= 0 ? 2 : page + 1}  
          </button>
        </li>
        <li className={"page-item"}>
          <button className={"page-link"} onClick={() => onPageChange(page + 1) } >
            {page < 2 ? 3 : page + 2}
          </button>
        </li>
        <li className={"page-item"}>
          <button className={"page-link"} onClick={() => onPageChange(page + 1) } >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
export default Pagination;
