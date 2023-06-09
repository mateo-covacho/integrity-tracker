import React, { useEffect } from "react";
import {
  Button,
  Panel,
  ButtonGroup,
  Tag,
  Callout,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Collapse,
  Icon,
} from "@blueprintjs/core";
import { url } from "../utils/url";
import urljoin from "url-join";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";

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
const Sidemenu = ({
  mdd = 3,
  xss = 3,
  className,
}: {
  mdd?: number;
  xss?: number;
  className?: string;
}) => {
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const currentPage = router.pathname;

  function get_category_url(category: string) {
    const endpointPath = `/categories/${category.toLowerCase()}`;
    return urljoin(url, endpointPath);
  }

  function handleCollapse() {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    if (currentPage === "/categories/[category]") {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [currentPage]);

  return (
    <Col className={"outline_right" + className}>
      <br />
      <Button intent="primary" alignText="right" fill={true} icon="plus">
        Create post
      </Button>
      <br />
      <Row
        onClick={() => {
          handleCollapse();
        }}
        style={{ cursor: "pointer" }}
      >
        <NavbarGroup>
          <h4>Categories</h4>
          <Icon className="ms-3" icon={isOpen ? "chevron-up" : "add"} />
        </NavbarGroup>
      </Row>
      <br />
      <Collapse isOpen={isOpen}>
        <Link href={get_category_url("Politics")}>
          <Button alignText="right" fill={true}>
            Politics
          </Button>
        </Link>
        <br />
        <Link href={get_category_url("Finance")}>
          <Button alignText="right" fill={true}>
            Finance
          </Button>
        </Link>
        <br />
        <Link href={get_category_url("Business")}>
          <Button alignText="right" fill={true}>
            Business
          </Button>
        </Link>
        <br />
        <Link href={get_category_url("Academia")}>
          <Button alignText="right" fill={true}>
            Academia
          </Button>
        </Link>
        <br />
        <Link href={get_category_url("Journalists")}>
          <Button alignText="right" fill={true}>
            Journalists
          </Button>
        </Link>
        <br />
        <Link href={get_category_url("Non-profits")}>
          <Button alignText="right" fill={true}>
            Non-profits
          </Button>
        </Link>
      </Collapse>
    </Col>
  );
};

export default Sidemenu;
