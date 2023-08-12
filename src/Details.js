import { useEffect,useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "./App";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./details.css";

import React from "react";

export default function Details() {
  const user = useContext(myContext);
  const [previewUrl,setPreview]=useState([]);


//fetching isbn no of bbok from api
  useEffect(() => {
    if (user.isbn !== "") {
      fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${user.isbn}&jscmd=details&format=json`
      )
        .then((response) => response.json())
        .then((data) => {
          user.setDetail(Object.values(data)[0]);
          setPreview(Object.values(data)[0].preview_url);
        });
    }
  }, [user.isbn]);

  //func to switch themes
  var chooseTheme = () => {
    var element = document.getElementById("maindiv");
    document.body.classList.toggle("change");
  };

  return (
    <>
      <div className="themeD">
        <div className="gobck">
          <Link to="/">
            <button id="backbtn">
              <ArrowBackIosIcon />
            </button>
          </Link>
        </div>
        <div className="midspace"></div>
        <div className="setThe">
          <button id="themebtn" onClick={chooseTheme}>
            Theme
          </button>
        </div>
      </div>
      <div className="detailOuterDiv">
        {user.detail.details !== undefined ? (
          <div className="detailMain">
            <div className="dispDetails">
              <div className="imageDiv">
                {user.detail.thumbnail_url !== undefined ? (
                  <img src={user.detail.thumbnail_url} alt="book" />
                 
                ) : (
                  <img
                    src="https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg"
                    alt="book"
                  />
                )}
              </div>
              <div className="detailText">
                <h1>{user.detail.details.title}</h1>
                {user.detail.details.authors!==undefined? <h4>by {user.detail.details.authors[0].name}</h4>:<h4></h4>}               
                <div className="bookD">
                  <div>
                    <h4>Publish Date</h4>
                    <p className="textVal">
                      {user.detail.details.publish_date}
                    </p>
                  </div>
                  <div>
                    <h4>Publisher</h4>
                    <p className="textVal">{user.detail.details.publishers}</p>
                  </div>
                  <div>
                    <h4>Number of pages</h4>
                    <p className="textVal">
                      {user.detail.details.number_of_pages}
                    </p>
                  </div>
                </div>
                 {user.detail.details.subjects!==[]? <div>
                 <p>Subjects: {user.detail.details.subjects}</p>
                 </div>:<div></div>}              
              </div>
            </div>
           
            <div className="btns">
              <div>
              <a href={previewUrl}target="_blank"><button id="pre">Preview</button></a>
              </div>
              <br></br>
              <div>
              <a href={`https://www.google.com/search?tbm=bks&q=${user.detail.details.title}` }  target="_blank">  <button id="wantTo">Want to read</button></a>             
              </div>
              <br></br>
            </div>
          </div>
        ) : (
          <div>
            <h1>"Enter Correct Title"</h1>
          </div>
        )}
      </div>
  
    </>
  );
}
