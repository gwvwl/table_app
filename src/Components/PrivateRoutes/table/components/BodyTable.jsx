import React from "react";

import imgDelete from "../../../../style/img/delete.png";
import imgPut from "../../../../style/img/rename.png";
const BodyTable = ({ setModalDetele, setModalPut, data, columns }) => {
    const showModalDel = (item) => {
        setModalDetele(() => {
            return {
                visible: true,
                item: item,
            };
        });
    };
    const showModalPut = (item) => {
        setModalPut(() => {
            return {
                visible: true,
                item: item,
            };
        });
    };
    return (
        data &&
        data.map((item, index) => (
            <tr key={index}>
                {typeof item === "object" &&
                    columns.map(({ accessor }, ind) => {
                        if (accessor === "delete") {
                            return (
                                <td
                                    key={index + ind}
                                    onClick={() => showModalDel(item)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        className="table-icon"
                                        src={imgDelete}
                                        alt="delete"
                                    />
                                </td>
                            );
                        }
                        if (accessor === "put") {
                            return (
                                <td
                                    key={index + ind}
                                    onClick={() => showModalPut(item)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <img
                                        className="table-icon"
                                        src={imgPut}
                                        alt="put"
                                    />
                                </td>
                            );
                        }

                        return <td key={index + ind}>{item[accessor]}</td>;
                    })}
            </tr>
        ))
    );
};

export default BodyTable;
