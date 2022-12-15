import "../../Styles/SearchBox.css";
import React, { useState, useRef } from "react";
import HttpServices from "../../Services/HttpServices";
import StorageService from "../../Services/StorageServices";

function SearchBox() {
  const searchText = useRef();

  const [searchData, setSearchData] = useState();
  const [searchType, setSearchType] = useState("All");

  //-----------------------------get search data-------------------------------
  const search = async (e) => {
    let searchValue = searchText.current.value;
    let userInfo = StorageService.get("userInfo");
    let userId = userInfo ? userInfo.companyId : "";
    let response
    if (searchValue.length >= 3) {
      response = await HttpServices.get(
        `secure/globalSearch/${userId}?search=${searchValue}`
      );

    } else {
      response = []
    }
    setSearchData(response.docs);

  };

  const handleSearch = (e) => {
    setSearchType(e.target);
  };


  const handleEdit = (e) => {
    // console.log(e.target.getAttribute("data-custom-value"))
  }

  return (
    <>
      <input
        className="form-control"
        style={
          searchText.current
            ? searchText.current.value.length < 3
              ? {}
              : { height: "100%" }
            : {}
        }
        ref={searchText}
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => search(e)}
      />
      <div id="searchArea">
        <div
          id="popUp"
          style={
            searchText.current
              ? searchText.current.value.length < 3
                ? { display: "none" }
                : {}
              : { display: "none" }
          }
        >
          <div id="popUpLinks" className="d-flex list-unstyled ">
            <div id="searchTypes" className="d-flex w-5">
              <a
                className="w-25 text-center"
                id="All"
                role="button"
                aria-expanded="true"
                style={{
                  width: "50px",
                  textDecoration: "none",
                  color: "#0275d8",
                }}
                onClick={(e) => handleSearch(e)}
              >
                All
              </a>
              <a
                className="w-25  text-center"
                id="deal"
                role="button"
                aria-expanded="true"
                style={{ width: "50px", color: "#0275d8" }}
                onClick={(e) => handleSearch(e)}
              >
                <i id="deal" className="bi bi-currency-dollar"></i>
              </a>
              <a
                className="w-25 text-center"
                id="people"
                role="button"
                aria-expanded="true"
                style={{
                  display: "inlinBlock",
                  width: "50px",
                  color: "#0275d8",
                }}
                onClick={(e) => handleSearch(e)}
              >
                <i id="people" className="bi bi-person-fill" />
              </a>

              <a
                className="w-25 text-center"
                id="organization"
                role="button"
                aria-expanded="true"
                style={{
                  display: "inlinBlock",
                  width: "50px",
                  color: "#0275d8",
                }}
                onClick={(e) => handleSearch(e)}
              >
                <i
                  id="organization"
                  className="bi bi-building"
                  onClick={(e) => handleSearch(e)}
                />
              </a>
            </div>
          </div>
          <div>
            <div
              id="searchDropDown"
              className="tab"
              style={
                searchType === "All"
                  ? {
                    textAlign: "left",
                    overflowY: "scroll",
                    maxHeight: "200px",
                  }
                  : { display: "none" }
              }
            >
              {searchData
                ? searchData.map((option, index) =>
                  option.type === "Deal" ? (
                    <a id={option._id} data-custom-value={option.dealNo} onClick={(e) => handleEdit(e)} key={index} href={`#/deal/${option.dealNo}`} className="dropdown-item">
                      <i className="bi bi-currency-dollar"></i>
                      {option.dealTitle}
                    </a>
                  ) : option.type === "People" ? (
                    <a id={option._id} data-custom-value={option.peopleNo} onClick={(e) => handleEdit(e)} href={`#/people/${option.peopleNo}`} key={index} className="dropdown-item">
                      <i className="bi bi-person-fill" />
                      {option.name}
                    </a>
                  ) : (
                    <a id={option._id} data-custom-value={option.organizationNo} onClick={(e) => handleEdit(e)} key={index} className="dropdown-item ml-0">
                      <i className="bi bi-building" />
                      {option.name}
                    </a>
                  )
                )
                : ""}
            </div>

            <div
              style={
                searchType === "deal"
                  ? {
                    textAlign: "left",
                    overflowY: "scroll",
                    maxHeight: "200px",
                  }
                  : { display: "none" }
              }
            >
              {searchType === "deal" ? (
                <div className="tab" style={{ textAlign: "left" }}>
                  {searchData
                    ? searchData.map((option, index) =>
                      option.type === "Deal" ? (
                        <a key={index} className="dropdown-item">
                          <i className="bi bi-currency-dollar" />
                          {option.dealTitle}
                        </a>
                      ) : (
                        ""
                      )
                    )
                    : ""}
                </div>
              ) : (
                ""
              )}
            </div>
            <div
              style={
                searchType === "people"
                  ? {
                    textAlign: "left",
                    overflowY: "scroll",
                    maxHeight: "200px",
                  }
                  : { display: "none" }
              }
            >
              {searchType === "people" ? (
                <div className="tab" style={{ textAlign: "left" }}>
                  {searchData
                    ? searchData.map((option, index) =>
                      option.type === "People" ? (
                        <a key={index} className="dropdown-item">
                          <i className="bi bi-person-fill" />
                          {option.name}
                        </a>
                      ) : (
                        ""
                      )
                    )
                    : ""}
                </div>
              ) : (
                ""
              )}{" "}
            </div>
            <div
              style={
                searchType === "organization"
                  ? {
                    textAlign: "left",
                    overflowY: "scroll",
                    maxHeight: "200px",
                  }
                  : { display: "none" }
              }
            >
              {searchType === "organization" ? (
                <div className="tab" style={{ textAlign: "left" }}>
                  {searchData
                    ? searchData.map((option, index) =>
                      option.type === "Organization" ? (
                        <a key={index} className="dropdown-item">
                          <i className="bi bi-building" />
                          {option.name}
                        </a>
                      ) : (
                        ""
                      )
                    )
                    : ""}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default SearchBox;
