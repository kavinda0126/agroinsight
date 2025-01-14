import React from "react";
import Card from "react-bootstrap/Card";
const MMDBCard = ({ title, value1,value2, iconClass, duration }) => {
  return (
    <div className="col-lg-4">
      <Card bg="white" text="black" className="shadow-lg">
        <Card.Body>
          <Card.Title className="text-success" style={{ whiteSpace: "nowrap" }}>
            {title}
            <span className="text-success">|{duration} </span>
            <i className={`bi ${iconClass} fa-9x float-end`}></i>
          </Card.Title> 
          <Card.Text>
            <h2 className="mb-2 text-body-dark">
              {title === "Total Salaries"
                ? "Rs." + value1.toLocaleString("en-US")
                : value1.toLocaleString("en-US")}
            </h2>
            <h3 className="mb-2 text-body-secondary">
              {title === "Total Salaries"
                ? "Rs." + value2.toLocaleString("en-US")
                : value2.toLocaleString("en-US")}
            </h3>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
export default MMDBCard;