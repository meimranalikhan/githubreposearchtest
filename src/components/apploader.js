import React from 'react';
import { Spinner } from 'react-bootstrap';

const Apploader = () => {
    return (
        <div 
            style={{
                opacity: "0.6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white",
                position: "fixed",
                paddingTop: "50px",
                height: "100vh",
                zIndex: "999",
                width: "100%"
            }}
        >
            <Spinner variant="primary" animation="grow" size="lg" />
        </div>
    )
}

export default Apploader;