import React, { useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

function BarCodeInformation({ barCode, setBarCode, setIsShownModal }) {
  const options = [{ value: "Pet", label: "Pet" }];
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [brand, setBrand] = useState("");
  const [capacity, setCapacity] = useState("");
  const [material, setMaterial] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const URL =
    "https://fluffy-red-piranha.cyclic.app/api/metabin/create-new-barcode/";
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    if (!barCode || !brand || !company || !material || !capacity) {
      return setErrorMessage("Please fill in all required fields.");
    }
    setLoading(true);
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
          setLoading(false);
          toast.success("Barcode has been added successfully");
          setIsShownModal(false);
        } else {
          setLoading(false);
          setIsShownModal(false);
          toast.error("something went wrong");
        }
      })
      .catch((error) => {
        setLoading(false);
        setIsShownModal(false);

        toast.error("something went wrong");
        console.log(error.response ? error.response?.data : error.message);
      });
  };
  return (
    <div>
      <div className="title">
        <b>Barcode Data Collection and Product Information</b>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Barcode Number</label>
        <input
          value={barCode}
          type="string"
          className="input-field"
          placeholder="barcode number"
          onChange={(e) => setBarCode(e.target.value)}
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
          type="string"
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
        <button
          className="primary-btn normal-size flex align-center justify-center "
          type="submit"
        >
          {loading ? <ReactLoading type={"bubbles"} color="#fff" /> : "SAVE"}
        </button>
      </form>
    </div>
  );
}

export default BarCodeInformation;
