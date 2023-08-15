import { useEffect } from "react";
import "./App.css";

function App() {
  const registerCompany = async () => {
    const url = "http://20.244.56.144/train/register";
    const dataToSend = {
      companyName: "Train Central",
      ownerName: "Vedant",
      rollNo: "1NT20IS184",
      ownerEmail: "1nt20is184.vedant@nmit.ac.in",
      accessCode: "htKrDr",
    }; // The data  to send

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify the content type of the request body
        // You can add more headers here if needed
      },
      body: JSON.stringify(dataToSend), // Convert the data to JSON format
    };

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Fetch Error:", error);
      });
  };
  useEffect(() => {
    registerCompany();
  }, []);

  return <div className="App"></div>;
}

export default App;
