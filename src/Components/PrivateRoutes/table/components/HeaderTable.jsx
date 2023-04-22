import React from "react";
import FilterInputs from "./FilterInputs";
import imgDelete from "../../../../style/img/delete.png";
import imgPut from "../../../../style/img/rename.png";
const HeaderTable = ({ dataInput, onChangeData, columns }) => {
  return columns.map((column) => {
    if (column.accessor === "delete") {
      return (
        <th key={column.Header}>
          <img className="table-icon false" src={imgDelete} alt="delete" />
        </th>
      );
    }
    if (column.accessor === "put") {
      return (
        <th key={column.Header}>
          <img className="table-icon false" src={imgPut} alt="rename" />
        </th>
      );
    }
    if (column.accessor === "num") {
      return (
        <th key={column.Header}>
          <div> №</div>
        </th>
      );
    }
    return (
      <th key={column.accessor}>
        <div> {column.Header}</div>
        <div className="wrapper_filter">
          {
            <FilterInputs
              name={column.accessor}
              dataInput={dataInput}
              onChangeData={onChangeData}
            />
          }
        </div>
      </th>
    );
  });
};
export default HeaderTable;
