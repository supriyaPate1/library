import Details from "./Details";
import Login from "./Login";
import { Route, Routes } from "react-router-dom";
import BookSearch from "./BookSearch";
import { createContext } from "react";
import { useState } from "react";
export const myContext = createContext();

function App() {
  const [posts, setPosts] = useState([]);
  const [isbn, setIsbn] = useState([]);
  const [detail, setDetail] = useState("");
  var [text, setText] = useState("");
  return (
    <>
      <myContext.Provider
        value={{
          detail: detail,
          setDetail: setDetail,
          isbn: isbn,
          posts: posts,
          setIsbn: setIsbn,
          setPosts: setPosts,
          text: text,
          setText: setText,
        }}
      >
        <Routes>
          <Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<BookSearch />}></Route>
            <Route path="/details" element={<Details />}></Route>
          </Route>
        </Routes>
      </myContext.Provider>
    </>
  );
}

export default App;
