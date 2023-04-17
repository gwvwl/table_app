import React from "react";
const FilterInputs = ({ name, dataInput, onChangeData }) => {
    if (name === "created_at") {
        return (
            <>
                <input
                    type="date"
                    name="dateMin"
                    value={dataInput[name]}
                    onChange={(e) =>
                        onChangeData(e.target.name, e.target.value)
                    }
                />
                <div className="mobile_date">До</div>
                <input
                    type="date"
                    name="dateMax"
                    value={dataInput[name]}
                    onChange={(e) =>
                        onChangeData(e.target.name, e.target.value)
                    }
                />
            </>
        );
    }
    return (
        <input
            name={name}
            type="text"
            value={dataInput[name]}
            onChange={(e) => onChangeData(e.target.name, e.target.value)}
        />
    );
};

export default FilterInputs;
