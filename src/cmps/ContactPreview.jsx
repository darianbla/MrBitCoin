import React, { useState } from "react";
import { Link } from "react-router-dom";

export function ContactPreview({ contact, onRemoveContact }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Link to={`/contact/${contact._id}`}>
      <li
        className="contact-preview"
        onMouseOver={() => setHoveredCard(contact._id)}
        onMouseLeave={() => setHoveredCard(null)}>
        <section className="info">
          <div className="img-container">
            <img
              src={`https://robohash.org/${contact._id}?set=set5`}
              alt="Profile Image"
              className="avatar"
            />
          </div>
          <h2>{contact.name}</h2>
        </section>
        <button
          className={`remove-btn ${
            hoveredCard === contact._id ? "remove-btn-hovered" : ""
          }`}
          onClick={(ev) => onRemoveContact(ev, contact._id)}>
          X
        </button>
      </li>
    </Link>
  );
}
