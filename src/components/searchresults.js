import React, { useState, useRef } from "react";
import { Container, Row, Col, Dropdown, DropdownButton, Card, Overlay, Popover } from "react-bootstrap";
import "./searchbar.css";
import * as actions from "../store/actions/repositorysearcher";
import { useSelector, useDispatch } from "react-redux";

const RepositorySearcher = (props) => {

    const dispatch = useDispatch();
    const sortedResult = useSelector(({ repositorysearcher }) => repositorysearcher.sortedResult);
    const currentRepoIssues = useSelector(({ repositorysearcher }) => repositorysearcher.currentRepoIssues);
    const star = "https://img.icons8.com/material-sharp/50/000000/star--v1.png";

    const [sorting, setSorting] = useState("best match");

    const [overlay, setOvelay] = useState({
        show: false,
        timeoutId: null,
        target: null
    })
    const [overlayShow, setOverlayShow] = useState(false);
    const ref = useRef(null);

    const onSorting = (e) => {
        setSorting(e);
        switch (e) {
            case "best match":
                return dispatch(actions.sortBestMatch());
            case "top starred":
                return dispatch(actions.sortStarred());
            case "top forked":
                return dispatch(actions.sortForked());
        }
    }

    const onUpdateDate = (dbDate) => {
        let dbDateTime = dbDate;
        let date = dbDateTime.split("T")[0].split("-");
        let dateTime = new Date(date[0], date[1] - 1, date[2]);
        let currentDateTime = new Date();
        let diff = currentDateTime - dateTime;
        let newYear = Math.round(diff / (1000 * 60 * 60 * 24 * 360));
        let newMonth = Math.round(diff / (1000 * 60 * 60 * 24 * 30));
        let newDay = Math.round(diff / (1000 * 60 * 60 * 24));

        if (newDay < 1) {
            return ("Today");
        }
        else if (newDay < 30) {
            return (newDay + " day ago");
        }
        else if (newMonth < 12) {
            return (newMonth + " month ago");
        }
        else {
            return (newYear + " year ago");
        }
    }

    const onOverlayShow = (event, data, value) => {
        if (value) {
            dispatch(actions.loadIssues(data.issues_url));
            clearTimeout(overlay.timeoutId);
            setOverlayShow(false);
            var timeoutId = setTimeout(() => setOverlayShow(value), 2000);
            setOvelay({
                target: event.target,
                timeoutId: timeoutId
            });
        }
        else {
            clearTimeout(overlay.timeoutId);
            setOverlayShow(value);
            setOvelay({
                target: null,
                timeoutId: null
            })
        }
    };
    return (
        <>
            <Container
                style={{
                    height: "100vh",
                    paddingTop: "50px",
                    minWidth: "900px",
                    maxWidth: "900px",
                }}
                fluid
            >
                <Card>
                    <Row style={{ padding: "1rem" }}>
                        <Col xs="auto">
                            <h5>{sortedResult.length + " repository results"}</h5>
                        </Col>
                        <div style={{ flex: 1 }} />
                        <Col xs="auto">
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={"Sort By: " + sorting}
                                onSelect={(e) => onSorting(e)}
                            >
                                <Dropdown.Item eventKey="best match">best match</Dropdown.Item>
                                <Dropdown.Item eventKey="top starred">top starred</Dropdown.Item>
                                <Dropdown.Item eventKey="top forked">top forked</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Row>
                        {sortedResult.map((opt, index) =>
                            <Row ref={ref} key={index}>
                                <Row>
                                    <Col>
                                        <div
                                            onMouseEnter={(e) => onOverlayShow(e, opt, true)}
                                            style={{
                                                width: "100%",
                                                borderTop: "1px solid",
                                                padding: "2rem"
                                            }}
                                        >
                                            <Row>
                                                <Col xs="1">
                                                    <img height="50px" src={opt.owner.avatar_url} />
                                                </Col>
                                                <Col xs="11">
                                                    <h6>{opt.full_name}</h6>
                                                    <p>{opt.description}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="auto">
                                                    <Row>
                                                        <Col xs="1"><img height="15px" src={star} /></Col>
                                                        {opt.stargazers_count ? <Col xs="auto" style={{ paddingTop: "0.1rem" }}>{opt.stargazers_count}</Col> : null}
                                                    </Row>
                                                </Col>
                                                <Col xs="auto">{opt.language}</Col>
                                                {opt.license ? <Col xs="auto">{opt.license.spdx_id + " " + "license"}</Col> : null}
                                                <Col xs="auto">{"Updated " + onUpdateDate(opt.updated_at)}</Col>
                                                {opt.open_issues ? <Col xs="auto">{opt.open_issues + " issues need help"}</Col> : null}
                                            </Row>
                                        </div>
                                        {opt.has_issues ? <Overlay
                                            show={overlayShow}
                                            target={overlay.target}
                                            placement="right"
                                            container={ref.current}
                                        >
                                            <Popover
                                                onMouseLeave={(e) => onOverlayShow(e, opt, false)}
                                                style={{
                                                    maxWidth: "500px",
                                                    zIndex: "1000"
                                                }}
                                            >
                                                <Popover.Title>
                                                    Open Issues
                                                </Popover.Title>
                                                <Popover.Content>
                                                    {currentRepoIssues.map((currentRepoIssue, index) =>
                                                        <div key={index}>
                                                            {index <= 5 ?
                                                                <Row
                                                                    style={{
                                                                        overflow: "hidden",
                                                                        height: "80px",
                                                                        borderTop: "1px solid",
                                                                        padding: "2rem"
                                                                    }}
                                                                >
                                                                    <Col>
                                                                        <Row>{currentRepoIssue.title}</Row>
                                                                        <Row><a href={currentRepoIssue.url}>{currentRepoIssue.url}</a></Row>
                                                                    </Col>
                                                                </Row>
                                                                : null}
                                                        </div>
                                                    )}
                                                </Popover.Content>
                                            </Popover>
                                        </Overlay> : null}
                                    </Col>
                                </Row>
                            </Row>
                        )}
                    </Row>
                </Card>
            </Container>
        </>
    )
}

export default RepositorySearcher