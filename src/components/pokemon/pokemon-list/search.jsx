function Search({ search, onSearch }) {
  return (
    <div className="form-group mb-3 ">
      <input
        value={search}
        onChange={(event) => {
          onSearch(event.target.value);
        }}
        type="text"
        className="form-control"
        placeholder="Search.."
        autoFocus
      />
    </div>
  );
}

export default Search;