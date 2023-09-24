import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Container } from "react-bootstrap";

export const UserLayout = ({ children, title }) => {
  return (
    <div className="user-layout">
      <main className="main">
        <Header />
        <Container>
          <div className="mt-3">
            <h3>{title}</h3>
            <hr />
          </div>
          <div className="page-content">{children}</div>
        </Container>
        <Footer />
      </main>
    </div>
  );
};
