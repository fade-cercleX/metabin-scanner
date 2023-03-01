import React, { useState } from "react";
import Select from "react-select";

function BarCodeInformation() {
  const [selectedOption, setSelectOption] = useState(null);
  const options = [{ value: "Pet", label: "Pet" }];

  return (
    <div>
      <b>More Information</b>

      <form>
        <label>Barcode number</label>
        <input
          value={"25452565625"}
          type="string"
          className="input-field"
          disabled
          placeholder="barcode number"
        />
        <label>Product </label>
        <div className="input-drop-down">
          <Select
            value={selectedOption}
            onChange={setSelectOption}
            options={options}
            onFocus={{ borderColor: "red" }}
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "50px",
                borderColor: "#efefef",
              }),
            }}
          />
        </div>
        <label>Product Name</label>
        <input
          type="string"
          className="input-field"
          placeholder="product name"
        />

        <label>Company Name</label>
        <input
          type="string"
          className="input-field"
          placeholder="company name"
        />

        <label>Capacity </label>
        <input
          type="string"
          className="input-field"
          placeholder="capacity ex: 1.5L"
        />

        <button className="primary-btn normal-size ">Save</button>
      </form>
    </div>
  );
}

export default BarCodeInformation;
