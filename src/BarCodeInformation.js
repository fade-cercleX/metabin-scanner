import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

function BarCodeInformation({ barCode }) {
  const options = [{ value: "Pet", label: "Pet" }];
  const [company, setCompany] = useState("");
  const [brand, setBrand] = useState("");
  const [capacity, setCapacity] = useState("");
  const [material, setMaterial] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const URL = "https://a442-202-129-197-162.in.ngrok.io/";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    if (!barCode || !brand || !company || !material || !capacity) {
      return setErrorMessage("Please fill in all required fields.");
    }
    const req = new Request(URL, {
      method: "POST",
      body: JSON.stringify({
        company,
        brand,
        capacity,
        material: material.value,
        barcodeNumber: barCode
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    fetch(req)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Barcode has been added successfully");
        }else{
            toast.error("something went wrong")
        }
      })
      .catch((error) => {
        console.log(error.response ? error.response?.data : error.message);
      });
  };
  return (
    <div>
      <div  className="title" >
      <b >Barcode Data Collection and Product Information</b></div>

      <form onSubmit={handleSubmit}>
        <label>Barcode Number</label>
        <input
          value={barCode}
          type="string"
          className="input-field"
          disabled
          placeholder="barcode number"
        />
        <label>Product Material</label>
        <div className="input-drop-down">
          <Select
            value={material}
            onChange={setMaterial}
            options={options}
            onFocus={{ borderColor: "red" }}
            classNamePrefix="react-select"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                height: "50px",
                borderColor: "#efefef"
              })
            }}
          />
        </div>
        <label>Brand Name</label>
        <input
          type="string"
          className="input-field"
          placeholder="Enter Brand Name"
          onChange={(e) => {
            setBrand(e.target.value);
            setErrorMessage("");
          }}
          value={brand}
        />

        <label>Company Name</label>
        <input
          type="string"
          className="input-field"
          placeholder="Enter Company Name"
          onChange={(e) => {
            setCompany(e.target.value);
            setErrorMessage("");
          }}
          value={company}
        />

        <label>Capacity </label>
        <input
          type="number"
          className="input-field"
          placeholder=" Enter Capacity "
          onChange={(e) => {
            setCapacity(e.target.value);
            setErrorMessage("");
          }}
          value={capacity}
        />
        {errorMessage && (
          <p style={{ fontSize: "11px", color: "tomato" }}>{errorMessage}</p>
        )}
        <button className="primary-btn normal-size " type="submit">
          SAVE
        </button>
      </form>
    </div>
  );
}

export default BarCodeInformation;
