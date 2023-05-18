import React from "react";
import { Button, Panel, ButtonGroup, Tag, Callout, Navbar, NavbarGroup, NavbarHeading, NavbarDivider, Alignment } from "@blueprintjs/core";
import { url } from "../utils/url";
import urljoin from "url-join";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";

interface PostProps {
  id: string;
  user_id: string;
  public_figure_id: string;
  title: string;
  content: string;
  evidence_links: string[];
  truth_score: number;
  created_at: string;
  updated_at: string;
  category: string[];
}

const Sidemenu = () => {
  function get_category_url(category: string) {
    const endpointPath = `/categories/${category.toLowerCase()}`;
    return urljoin(url, endpointPath);
  }
  return (
    <Col xs={3} className='outline_right'>
      <h4>Categories</h4>
      <br />
      <Link href={get_category_url("Politics")}>
        <Button alignText='right' fill={true}>
          Politics
        </Button>
      </Link>
      <br />
      <Link href={get_category_url("Finance")}>
        <Button alignText='right' fill={true}>
          Finance
        </Button>
      </Link>
      <br />
      <Link href={get_category_url("Business")}>
        <Button alignText='right' fill={true}>
          Business
        </Button>
      </Link>
      <br />
      <Link href={get_category_url("Academia")}>
        <Button alignText='right' fill={true}>
          Academia
        </Button>
      </Link>
      <br />
      <Link href={get_category_url("Journalists")}>
        <Button alignText='right' fill={true}>
          Journalists
        </Button>
      </Link>
      <br />
      <Link href={get_category_url("Non-profits")}>
        <Button alignText='right' fill={true}>
          Non-profits
        </Button>
      </Link>
    </Col>
  );
};

export default Sidemenu;
