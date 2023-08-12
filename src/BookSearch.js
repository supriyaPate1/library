import React from "react";
import "./App.css";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "./App";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

export default function BookSearch() {
  const user = useContext(myContext);

  //function to get bookname from input field
  const searchBook = () => {
    var bookName = document.getElementById("inpVal").value.toUpperCase();
    if (bookName !== "") user.setText(bookName);
  };

  // function to get book details from api
  useEffect(() => {
    fetch(
      `https://openlibrary.org/search.json?q=${user.text}&mode=ebooks&has_fulltext=true`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          user.setPosts("");
        } else {
          user.setPosts(data.docs);
        }
      });
  }, [user.text]);

  //function to search on pressing enter key
  const EnterKey = (event) => {
    if (event.key === "Enter") {
      user.setText(event.target.value.toUpperCase());
      searchBook();
    }
  };

  //func to switch themes
  var chooseTheme = () => {
    var element = document.getElementById("maindiv");
    document.body.classList.toggle("change");
  };

  // func to set isbn value
  const captureIsbn = (e) => {
    if (e.target.id !== "") {
      user.setIsbn(e.target.id);
    }
  };
  const moveTop=()=>{
    window.scrollTo(0, 0);
  }
  return (
    <>
      <div className="maindiv" id="maindiv">
        <div className="theme">
          <button onClick={chooseTheme}>Theme</button>
        </div>
        <div className="heading">
          <h1>Welcome to Your Book Store</h1>
        </div>
        <div className="search">
          <input
            id="inpVal"
            placeholder="Search for books..."
            autoFocus
            onKeyPress={EnterKey}
            value={user.text}
            onChange={(e) => {
              user.setText(e.target.value);
            }}
          ></input>
          <button onClick={searchBook}>Search</button>
        </div>
        <div className="dispBook">
          {user.posts.length > 0 ? (
            user.posts.map((val, i) => {
              return (
                <div key={i}>
                  <div className="bookcards">
                    <div className="imgageBook">
                      <div>
                        <Link to="/details">
                          <img
                            src={`https://covers.openlibrary.org/b/olid/${val.cover_edition_key}.jpg`}
                            id={val.isbn !== undefined ? val.isbn[0] : ""}
                            onClick={captureIsbn}
                            alt="book"
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="authorDetails">
                      <Link to="/details">
                        <h2
                          className="title"
                          id={val.isbn !== undefined ? val.isbn[0] : ""}
                          onClick={captureIsbn}
                        >
                          {val.title}{" "}
                        </h2>
                      </Link>
                      <p>by {val.author_name}</p>
                      <p>
                        Languages:{" "}
                        {val.language !== undefined ? val.language.length : "0"}{" "}
                        -- {val.ebook_count_i} previewable
                      </p>
                      <p>First published in {val.first_publish_year}</p>
                      <p>{val.edition_count} editions</p>
                    </div>
                    <div className="sidebtns">
                      <div>
                        <Link to="/login">
                          <button id="borrow">Borrow</button>
                        </Link>
                      </div>
                      <div>
                        <Link to="/details">
                          <button className="read" id={val.isbn !== undefined ? val.isbn[0] : ""} onClick={captureIsbn}>Read</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div id="corrTitle">"Enter correct title."</div>
          )}
        </div>
    
      </div>
      <div className="movetop"><KeyboardDoubleArrowUpIcon onClick={moveTop}/></div>
    </>
  );
}
