import React, { useState, useRef, useEffect } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import BarCodeInformation from "./BarCodeInformation";

function Sccanner() {
  const [isShownModal, setIsShownModal] = useState(false);
  const [barCode, setBarCode] = useState("");
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    setIsShownModal(false);
  };

  useEffect(() => {
    setIsShownModal(false);
  }, []);

  useEffect(() => {
    if (barCode) {
      setIsShownModal(true);
    }
  }, [barCode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef]);

  const state = {
    delay: 100,
    result: "No result"
  };

  const previewStyle = {
    height: 300,
    width: "350px",
    borderRadius: "20px",
    position: "absolute",
    // eslint-disable-next-line no-dupe-keys
    borderRadius: "10px",
    objectFit: "contain"
  };
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = React.useState("Not Found");
  return (
    <div className="barcode-page-bg">
      <div className=" flex column align-center ">
        <div className="flex justify-center pt-2   ">
          <p className="white-color">
            {" "}
            Please scan the barcode on the product.
          </p>
        </div>

        <div
          style={{ position: "relative", width: "90vw" }}
          className="flex column justify-center align-center QR-code-bg "
        >
          <BarcodeScannerComponent
            width={300}
            height={320}
            onUpdate={(err, result) => {
              if (result) {
                setBarCode(result.text);
              } else setData("Not Found");
            }}
            delay={state.delay}
            style={previewStyle}
            videoStyle={{
              width: "370px",
              height: "320px",
              borderRadius: "10px",
              objectFit: "contain"
            }}
            containerStyle={{
              width: "370px",
              height: "320px",
              borderRadius: "10px",
              objectFit: "contain"
            }}
            className="qr-code-scanner"
          />
          <span className="qr-code-scanner-line"></span>
        </div>

        <div className="flex justify-center">
          <p className="white-color mt-1"> Scanning...</p>
        </div>
      </div>
      <div className={`bottom-modal ${isShownModal ? "show" : ""}`}>
        <div className="content" ref={modalRef}>
          <BarCodeInformation
            barCode={barCode}
            setIsShownModal={setIsShownModal}
          />
        </div>
      </div>
    </div>
  );
}

export default Sccanner;
// bet
