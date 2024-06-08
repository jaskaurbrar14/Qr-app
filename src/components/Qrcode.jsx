import React from "react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

function Qrcode() {
  const [businessCard, setBusinessCard] = useState({
    id: "",
    Name: "",
    Company: "",
    Phone: "",
    Email: "",
    URL: "",
  });
  const [businessCardList, setBusinessCardList] = useState([]);
  const [selectedBusinessCard, setSelectedBusinessCard] = useState(null);

  const handlebusinessCard = (event) => {
    setBusinessCard({
      id: Math.ceil(Math.random() * 10000),
      [event.target.Name]: event.target.value,
      [event.target.Company]: event.target.value,
      [event.target.Phone]: event.target.value,
      [event.target.Email]: event.target.value,
      [event.target.URL]: event.target.value,
    });
  };
  const handlebusinessCardList = (event) => {
    event.preventDefault();
    if (
      {
        [event.target.Name]: "",
        [event.target.Company]: "",
        [event.target.Phone]: "",
        [event.target.Email]: "",
        [event.target.URL]: "",
      }
    ) {
      setBusinessCardList(businessCardList);
    }
    setBusinessCardList([...businessCardList, businessCard]);
    setbusinessCard({
      Name: "",
      Company: "",
      Phone: "",
      Email: "",
      URL: "",
    });
  };

  const updateSelectedBusinessCard = () => {
    setSelectedBusinessCard(businessCardList[businessCardList.length - 1]);
  };

  const handleDisplayQr = (event, id) => {
    if (event.target.className === "generateQRCode") {
      const filteredBusinessCard = businessCardList.find(
        (Card) => Card.id === id
      );
      setSelectedBusinessCard(filteredBusinessCard);
    }
  };

  return (
    <div>
      <form onSubmit={handlebusinessCardList}>
        <label htmlFor="Name">Name</label>
        <input
          onChange={handlebusinessCard}
          id="Name"
          type="text"
          name="Name"
          placeholder="Enter Name here"
          value={businessCard.Name}
        />
        <label htmlFor="Company">Enter Company here</label>
        <input
          onChange={handlebusinessCard}
          id="Company"
          type="text"
          name="Company"
          placeholder="Enter Company here"
          value={businessCard.Company}
        />
        <label htmlFor="Phone">Enter Phone here</label>
        <input
          onChange={handlebusinessCard}
          id="Phone"
          type="number"
          name="Phone"
          placeholder="Enter Phone here"
          value={businessCard.Phone}
        />
        <label htmlFor="Email">Enter Email here</label>
        <input
          onChange={handlebusinessCard}
          id="Email"
          type="text"
          name="Email"
          placeholder="Enter Email here"
          value={businessCard.Email}
        />
        <label htmlFor="URL">Enter URL here</label>
        <input
          onChange={handlebusinessCard}
          id="URL"
          type="text"
          name="URL"
          placeholder="Enter URL here"
          value={businessCard.URL}
        />
        <button id="generateQR" onClick={() => updateSelectedBusinessCard()}>
          Generate QR Code
        </button>
      </form>
      <div>{urlList && <QRCodeSVG value={selectedBusinessCard.URL} />} </div>
      <ol>
        {businessCardList &&
          businessCardList.map((businessCardItem) => {
            return (
              <li key={businessCardItem.id}>
                <p>{businessCardItem.Name}</p>
                <p>{businessCardItem.Company}</p>
                <p>{businessCardItem.Phone}</p>
                <p>{businessCardItem.Email}</p>
                <p>{businessCardItem.URL}</p>
                <button
                  onClick={(event) => handleDisplayQr(event)}
                  className="generateQRCode"
                  key={businessCardItem.id}
                >
                  Display QR
                </button>
              </li>
            );
          })}
      </ol>
    </div>
  );
}
export default Qrcode;
