import React from 'react';
import { Container } from 'react-bootstrap';
import { FaBug } from 'react-icons/fa6';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 pt-4 pb-2">
      <Container className="text-center">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="d-flex align-items-center text-warning fw-bold fs-4">
            <FaBug className="me-2" />
            BuggyBuy
          </div>

          <div className="d-flex gap-3">
            <a
              href="https://github.com/MuhaibShamsher/Vulnerable-Web-Application"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-light"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/muhaib-shamsher-48163a26a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-light"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        <hr className="border-secondary mb-3" />

        <p className="mb-0 small">
          &copy; {new Date().getFullYear()} BuggyBuy. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}