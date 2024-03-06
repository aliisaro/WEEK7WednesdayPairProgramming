import { useState } from "react";

export const useBook = ({ title, author, genre, setbooksData }) => {
  const [books, setbooks] = useState([]);
  const apiUrl = "http://localhost:4000/api/books";
  const token = sessionStorage.getItem("token");
  const handlebooks = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      const newbook = {
        title,
        author,
        genre,
      };
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(newbook),
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      });
      // json = newbook
      const json = await response.json();
      console.log(response, newbook);
      if (response.ok) {
        setbooksData((prevbooks) => [json, ...prevbooks]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return { handlebooks, books };
};