import React from "react";
import { useState, useEffect } from "react";
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
  let [businessCardList, setBusinessCardList] = useState(
    JSON.parse(localStorage.getItem("businessCardList")) || []
  );
  const [selectedBusinessCard, setSelectedBusinessCard] = useState({
    id: "",
    Name: "",
    Company: "",
    Phone: "",
    Email: "",
    URL: "",
  });
  const handlebusinessCard = (event) => {
    setBusinessCard({
      ...businessCard,
      id: Math.ceil(Math.random() * 10000),
      [event.target.name]: event.target.value,
    });
  };
  const handleBusinessCardList = (event) => {
    event.preventDefault();
    setBusinessCardList([...businessCardList, businessCard]);
  };
  useEffect(() => {
    if (selectedBusinessCard.URL !== "") {
      setSelectedBusinessCard(businessCardList[businessCardList.length - 1]);
    } else {
      setSelectedBusinessCard({ ...businessCard, URL: businessCard.URL });
    }
    if (
      businessCard !=
      {
        id: "",
        Name: "",
        Company: "",
        Phone: "",
        Email: "",
        URL: "",
      }
    ) {
      setBusinessCard({
        id: "",
        Name: "",
        Company: "",
        Phone: "",
        Email: "",
        URL: "",
      });
    }
  }, [businessCardList]);

  useEffect(() => {
    const storageList = localStorage.getItem("businessCardList");
    if (storageList) {
      setBusinessCardList(JSON.parse(storageList));
      console.log(businessCardList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("businessCardList", JSON.stringify(businessCardList));
  }, [businessCardList]);

  const handleDisplayQr = (id) => {
    const filteredBusinessCard = businessCardList.find(
      (Card) => Card.id === id
    );
    setSelectedBusinessCard(filteredBusinessCard);
  };
  return (
    <div>
      <form onSubmit={(event) => handleBusinessCardList(event)}>
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
        <button id="generateQR" type="submit">
          Generate QR Code
        </button>
      </form>
      <div>
        {selectedBusinessCard.URL !== "" ? (
          <div>
            <QRCodeSVG value={selectedBusinessCard.URL} />
            URL: {selectedBusinessCard.URL}
          </div>
        ) : (
          <div>Please fill the form above to generate a QR code</div>
        )}{" "}
      </div>
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
                  onClick={() => handleDisplayQr(businessCardItem.id)}
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
