import React from 'react';
import './pageTitle.css';
import { Link } from "react-router-dom";

function PageTitle({ title, url }) {
  const segments = url.split("/").filter(Boolean); // Split the URL and remove empty segments

  return (
    <div className="pagetitle">
      <h1>{title}</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i className="bi bi-house-door"></i>
            </Link>
          </li>
          {segments.map((segment, index) => (
            <li key={index} className="breadcrumb-item">
              <Link to={`/${segments.slice(0, index + 1).join("/")}`}>
                {segment}
              </Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default PageTitle;
