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
  Dialog,
  DialogFooter,
  DialogBody,
  FormGroup,
  InputGroup,
  TextArea,
  TagInput,
} from "@blueprintjs/core";
import { url } from "../utils/url";
import urljoin from "url-join";
import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/router";
import { print } from "../utils/print";
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
const categories = [
  "Politics",
  "Finance",
  "Business",
  "Academia",
  "Journalists",
  "Non-profits",
];
const Sidemenu = ({
  mdd = 3,
  xss = 3,
  className = " ",
}: {
  mdd?: number;
  xss?: number;
  className?: string;
}) => {
  let [categoriesIsOpen, setCategoriesIsOpen] = useState(false);
  let [isDialogOpen, setisDialogOpen] = useState(false);
  const router = useRouter();
  const currentPage = router.pathname;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [evidenceLinks, setEvidenceLinks] = useState([]);
  const [category, setCategory] = useState("");
  const [public_figure, setpublic_figure] = useState("");
  const [public_figures, setpublic_figures] = useState([]);
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    console.log(title, content, evidenceLinks, category);

    setTitle("");
    setContent("");
    setEvidenceLinks([]);
    setCategory("");
  };
  function get_category_url(category: string) {
    const endpointPath = `/categories/${category.toLowerCase()}`;
    return urljoin(url, endpointPath);
  }

  function handleCollapse() {
    setCategoriesIsOpen(!categoriesIsOpen);
  }

  useEffect(() => {
    if (currentPage === "/categories/[category]") {
      setCategoriesIsOpen(true);
    } else {
      setCategoriesIsOpen(false);
    }
  }, [currentPage]);

  async function get_public_figures(q: string): Promise<object[]> {
    let ress = await fetch(
      urljoin(url, `/api/public_figures/get_public_figures?q=${q}`)
    ).then((res) => res.json());

    return ress.data;
  }

  let last_request_timestamp = 0;
  useEffect(() => {
    if (public_figure.length > 2) {
      const fetchData = async () => {
        console.log("red", "public_figure query: " + public_figure);
        last_request_timestamp = Date.now();
        const public_figures = await get_public_figures(public_figure);
        //@ts-ignore
        setpublic_figures(public_figures);
        console.log(public_figures);
      };

      fetchData();
    }
  }, [public_figure]);
  return (
    <Col className={className + " outline_right"}>
      <br />
      <Button
        intent="primary"
        alignText="right"
        fill={true}
        icon="plus"
        onClick={() => {
          setisDialogOpen(!isDialogOpen);
        }}
      >
        Create post
      </Button>
      <Dialog isOpen={isDialogOpen} title="Create a post" icon="add">
        <DialogBody>
          <form onSubmit={handleFormSubmit}>
            {/* title */}
            <FormGroup label="Title" labelFor="title-input">
              <InputGroup
                id="title-input"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            {/* content */}
            <FormGroup label="Content" labelFor="content-input">
              <TextArea
                id="content-input"
                placeholder="Enter post content"
                value={content}
                style={{ width: "100%" }}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormGroup>

            {/* evidence links */}
            <FormGroup
              label="Links to evidence"
              labelFor="evidence-links-input"
            >
              <TagInput
                id="evidence-links-input "
                className="blacktext "
                placeholder="Enter evidence links"
                values={evidenceLinks}
                onChange={(values) => setEvidenceLinks(values)}
                style={{ color: "black", width: "100%" }}
              />
            </FormGroup>

            {/* category */}
            <FormGroup
              label="Category"
              labelFor="category-input"
              className="w-50"
            >
              <input
                id="category-input"
                className="bp4-input"
                list="category-options"
                placeholder="Select category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <datalist id="category-options">
                {categories.map((category: string) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </FormGroup>

            {/* public figure */}
            <FormGroup
              label="Public figure"
              labelFor="category-input"
              className="w-50"
            >
              <input
                id="public_figure-input"
                className="bp4-input ms-2"
                list="public_figure-options"
                placeholder="Select public figure"
                value={public_figure}
                onChange={(e) => setpublic_figure(e.target.value)}
              />
              <datalist id="public_figure-options">
                {public_figures.map((public_figure: object) => (
                  // @ts-ignore
                  <option key={public_figure.id} value={public_figure.name} />
                ))}
              </datalist>
            </FormGroup>
          </form>
        </DialogBody>
        <DialogFooter
          actions={
            <>
              <Button intent="primary" type="submit" onClick={handleFormSubmit}>
                Submit
              </Button>

              <Button
                intent="danger"
                text="Close"
                onClick={() => {
                  setisDialogOpen(!isDialogOpen);
                }}
              />
            </>
          }
        />
      </Dialog>
      <br />
      <Row
        onClick={() => {
          handleCollapse();
        }}
        style={{ cursor: "pointer" }}
      >
        <NavbarGroup>
          <h4>Categories</h4>
          <Icon
            className="ms-3"
            icon={categoriesIsOpen ? "chevron-up" : "add"}
          />
        </NavbarGroup>
      </Row>
      <br />
      <Collapse isOpen={categoriesIsOpen}>
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
