import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./searchbar.css";
import * as actions from "../store/actions/repositorysearcher";
import { useSelector, useDispatch } from "react-redux";

const RepositorySearcher = (props) => {

    const dispatch = useDispatch();
    const results = useSelector(({ repositorysearcher }) => repositorysearcher.results);

    const [searchWords, setSearchWords] = useState("a");

    return (
        <>
            <div>
                <header className="userheader">
                    <nav className="userheader__navigation">
                        <div className="userheader__sidebarButton"></div>

                        <div className="spacer" />

                        <input 
                            onChange={(e) => setSearchWords(e.target.value)}
                            className="searchbox"
                            type="textbox" 
                            placeholder="Search repo..."
                        />
                        <Button 
                            onClick={() => dispatch(actions.loadResults(searchWords))}
                            className="searchButton"
                        >
                            Search
                        </Button>
                    </nav>
                </header>
            </div>
        </>
    )
}

export default RepositorySearcher