import { Triangle } from "@phosphor-icons/react";

const SortByContainer = ({
  sortByValue,
  setSortByValue,
  setDefaultSort,
  order,
  setOrder,
}) => {
  return (
    <div className="sort-by-container">
      <div
        className="sort-by-triangle-container"
        style={{ position: "relative", display: "inline-block" }}
      >
        <select
          id="sort"
          value={sortByValue}
          onChange={(event) => {
            setSortByValue(event.target.value);
            setDefaultSort(event.target.value);
          }}
        >
          <option value="" disabled>
            Sort by
          </option>
          <option value="created_at">Date</option>
          <option value="comment_count">Comment</option>
          <option value="votes">Vote</option>
        </select>
        <Triangle
          className="upside-down triangle-icons"
          id="DESC"
          size={18}
          style={{
            position: "absolute",
            right: "20px",
            top: "30%",
            pointerEvents: "none",
            transform: "rotate(180deg)",
          }}
        />
      </div>
      <div className="triangle-order-btn-container">
        <p>Order:</p>
        <Triangle
          className="triangle-icons"
          id="ASC"
          onClick={(event) => {
            setOrder(event.target.id);
          }}
          size={18}
        />
        <Triangle
          className="upside-down triangle-icons"
          id="DESC"
          onClick={(event) => {
            setOrder(event.target.id);
          }}
          size={18}
        />
      </div>
    </div>
  );
};

export default SortByContainer;
