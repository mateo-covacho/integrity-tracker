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
import { MenuItem2 } from "@blueprintjs/popover2";
import { Select2 } from "@blueprintjs/select";
import { UUID } from "crypto";
import {
  get_public_figures,
  public_figure_UUID_exists,
} from "./functions/public_figure_exists";

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

interface PublicFigure {
  id: UUID;
  name: string;
  occupation: string;
  bio: string;
  image_url: string;
  created_at: EpochTimeStamp;
  updated_at: EpochTimeStamp;
}

const categories = [
  "Politics",
  "Finance",
  "Business",
  "Academia",
  "Journalists",
  "Non-profits",
];

//test comment
const Sidemenu = ({
  mdd = 3,
  xss = 3,
  className = " ",
  ...props
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

  // const [public_figure, setpublic_figure] = useState("");
  // const [public_figures, setpublic_figures] = useState([]);
  // const [inputValue, set_InputValue] = useState("");
  // const [public_figure_uuid, set_public_figure_uuid] = useState("");

  const [public_figure_input_field, set_public_figure_input_field] =
    useState<String>("");
  const [public_figures_matching_query, set_public_figures_matching_query] =
    useState<PublicFigure[]>([]);
  let final_public_figure_uuid;

  const handle_public_figures_form_submit = (e: {
    preventDefault: () => void;
  }): void => {
    e.preventDefault();

    final_public_figure_uuid = public_figures_matching_query.find(
      (figure) => figure.name === public_figure_input_field
    )?.id;

    console.log(`checking is PF exists for ${final_public_figure_uuid}...`);
    console.log(
      `result ${public_figure_UUID_exists(final_public_figure_uuid)}...`
    );
    if (!public_figure_UUID_exists(final_public_figure_uuid)) {
      alert("Public figure not valid");
    } else {
      console.log(
        title,
        content,
        evidenceLinks,
        category,
        final_public_figure_uuid
      );

      setTitle("");
      setContent("");
      setEvidenceLinks([]);
      setCategory("");
      set_public_figure_input_field("");
    }
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

  useEffect(() => {
    if (public_figure_input_field.length > 4) {
      const fetchData = async () => {
        console.log("red", "public_figure query: " + public_figure_input_field);

        const public_figures = await get_public_figures(
          public_figure_input_field
        );

        //@ts-ignore
        set_public_figures_matching_query(public_figures);
        console.log(public_figures);
      };

      fetchData();
    }
  }, [public_figure_input_field]);
  return (
    <Col props className={className + " outline_right "}>
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
          <form onSubmit={handle_public_figures_form_submit}>
            {/* post title */}
            <FormGroup label="Title" labelFor="title-input">
              <InputGroup
                id="title-input"
                placeholder="Enter post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>

            {/* post content */}
            <FormGroup label="Content" labelFor="content-input">
              <TextArea
                id="content-input"
                placeholder="Enter post content"
                value={content}
                style={{ width: "100%" }}
                onChange={(e) => setContent(e.target.value)}
              />
            </FormGroup>

            {/* post evidence links */}
            <FormGroup
              label="Links to evidence"
              labelFor="evidence-links-input"
            >
              <TagInput
                //@ts-ignore
                id="evidence-links-input "
                className="blacktext "
                placeholder="Enter evidence links"
                values={evidenceLinks}
                //@ts-ignore
                onChange={(values) => setEvidenceLinks(values)}
                style={{ color: "black", width: "100%" }}
              />
            </FormGroup>

            {/* post category */}
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
              className="w-100"
            >
              <input
                id="public_figure-input"
                className="bp4-input "
                list="public_figure-options"
                placeholder="Select public figure"
                //@ts-ignore
                value={public_figure_input_field}
                onChange={(e) => set_public_figure_input_field(e.target.value)}
              />
              <datalist id="public_figure-options">
                {public_figures_matching_query.map((public_figure: object) => (
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
              <Button
                intent="primary"
                type="submit"
                onClick={handle_public_figures_form_submit}
              >
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
