import React, { useEffect, useState, useRef } from "react";
import { API } from "aws-amplify";

import { createGlowsick as createGlowstickMutation } from "./graphql/mutations";

import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { IoMdColorWand } from "react-icons/io";
import {BsArrowUp, BsX} from "react-icons/bs";

import useWindowDimensions from "./useWindowDimensions";

const options = [
  "Personal",
  "a parent",
  "a sibling",
  "a spouse",
  "a child",
  "a grandparent",
  "a friend",
  "other",
];


function Glowsticks({ imageId, glowsticks, name }) {
  // state management

  const initialFormState = { dedication: name, note: "" };

  const [formData, setFormData] = useState(initialFormState);
  const [customDedication, setCustom] = useState();

  const [timeoutCheck, setTimeoutCheck] = useState(false);

  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width < 1000) {
      setEntryToggle(false);
    }
  }, [width]);

  const [entryToggle, setEntryToggle] = useState(width > 1000);

  

  useEffect(() => {
   setFormData({ ...formData, dedication: name})
  }, [name]);

  // refs for focus
  const input = useRef(null);

  const onRadioSelect = () => {
    input.current.focus();
  };


  useEffect(()=>{
    if(entryToggle){
      setTimeoutCheck(false);
      setTimeout(setTimeoutCheck(true),2000);
    }

  },[entryToggle])

  // use effects


  useEffect(() => {
    console.log(name);
    console.log(imageId);
    setFormData({ dedication: name, note: "" });
  }, [imageId]);

  async function createGlowstick() {
    if (!formData.dedication) return;

      await API.graphql({
        query: createGlowstickMutation,
        variables: {
          input: { glowsickImageId: imageId, ...formData },
        },
      });
    

    setFormData(initialFormState);
    setCustom("");
  }

  return (
    <>
      {!entryToggle ? (
        <div
          className="minimized-glowsticks"
          onClick={() => setEntryToggle(true)}
        >
          <IoMdColorWand />
        </div>
      ) : (
        <div className="glowsticks-container">
          {glowsticks ? (
            <>
             <div className='glowstick-entry-hider'
             onClick={() => setEntryToggle(false)}

            >
              <BsX/>

            </div>
            {glowsticks.length > 0 ? 
            <div className="comments-container">
              <div className="comments-viewport">
                {glowsticks.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <div className="glowstickIcon">
                      <IoMdColorWand/>
                    </div>
                    <div className={comment.note? 'comment-text-wrapper':'comment-text-wrapper-solo'} >
                      <Row>
                    <div className="dedication">
                      <p>For {comment.dedication}...</p>
                    </div>
                    </Row>
                    <Row>
                    <div className="note">
                      {comment.note ? <p>{comment.note}</p> : ""}
                    </div>
                    </Row>
                    </div>
                  </div>
                ))}
                <div className="comments-overlay"></div>
              </div>
             
            </div>
            :""}

            </>
           
          ) : (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <Container className="glowstick-input-wrapper">
       
            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Label>For: </Form.Label>
                </Col>
                <Col>
                  <div className="input-with-effect">
                    <input
                      id="dedication"
                      onChange={(e) =>
                        setFormData({ ...formData, dedication: e.target.value })
                      }
                      placeholder="Dedicate your glowstick..."
                      value={formData.dedication}
                      className="effect-1"
                    />
                    <span className="focus-border"></span>
                  </div>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Label>Note: </Form.Label>
                </Col>
                <Col>
                  <div className="input-with-effect">
                    <input
                      onChange={(e) =>
                        setFormData({ ...formData, note: e.target.value })
                      }
                      placeholder="Leave a note (optional)"
                      value={formData.note}
                      id="note-input"
                      className="effect-1"
                      type="text"
                    />
                    <span className="focus-border"></span>
                  </div>
                </Col>
              </Form.Row>
            </Form.Group>

            {/* <Form className="glowstick-input-form">
        <Row>
          <Col>
            <label className="radio">
              <span className="radio__input">
                <input
                  type="radio"
                  name="dedication"
                  label="Personal"
                  value="Personal"
                  id="Personal"
                  checked={formData.dedication === "Personal"}
                  onChange={(e) => setFormData({ ...formData, dedication: "Personal" })}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">Personal</span>
            </label>
          </Col>
          <Col>
            <label className="radio">
              <span className="radio__input">
                <input
                  type="radio"
                  name="dedication"
                  label="Parent"
                  value="a parent"
                  id="parent"
                  checked={formData.dedication === "a parent"}
                  onChange={(e) => setFormData({ ...formData, dedication: "a parent" })}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">Parent</span>
            </label>
          </Col>
          <Col>
            <label className="radio">
              <span className="radio__input">
                <input
                  type="radio"
                  name="dedication"
                  label="Sibling"
                  value="a sibling"
                  id="sibling"
                  checked={formData.dedication === "a sibling"}
                  onChange={(e) => setFormData({ ...formData, dedication: "a sibling" })}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">Sibling</span>
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="radio">
              <span className="radio__input">
                <input
                  type="radio"
                  name="dedication"
                  label="Spouse"
                  value="a spouse"
                  id="spouse"
                  checked={formData.dedication === "a spouse"}
                  onChange={(e) => setFormData({ ...formData, dedication: "a spouse" })}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">Spouse</span>
            </label>
          </Col>
          <Col>
            <label className="radio">
              <span className="radio__input">
                <input
                  type="radio"
                  name="dedication"
                  label="Child"
                  value="a child"
                  id="child"
                  checked={formData.dedication === "a child"}
                  onChange={(e) => setFormData({ ...formData, dedication: "a child" })}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">Child</span>
            </label>
          </Col>
          <Col>
            <label className="radio">
              <span className="radio__input">
                <input
                  type="radio"
                  name="dedication"
                  label="Grandparent"
                  value="a grandparent"
                  id="grandparent"
                  checked={formData.dedication === "a grandparent"}
                  onChange={(e) => setFormData({ ...formData, dedication: "a grandparent" })}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">Grandparent</span>
            </label>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="radio">
              <span className="radio__input">
                <input
                  type="radio"
                  name="dedication"
                  value="a friend"
                  id="friend"
                  checked={formData.dedication === "a friend"}
                  onChange={(e) => setFormData({ ...formData, dedication: "a friend" })}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">Friend</span>
            </label>
          </Col>
          <Col>
            <label className="radio">
              <span className="radio__input" id="other_input">
                <input
                  type="radio"
                  aria-label="Other"
                  name="dedication"
                  value="Other"
                  className="custom-radio"
                  id="other"
                  checked={formData.dedication === "Other"}
                  onChange={(e) => {
                    setFormData({ ...formData, dedication: "Other" });
                    onRadioSelect();
                  }}
                />
                <span className="radio__control"></span>
              </span>
              <span className="radio__label">
                <input
                  type="text"
                  value={customDedication}
                  placeholder="Other"
                  onChange={(e) => setCustom(e.target.value)}
                  className="effect-1"
                  id="other"
                  ref={input}
                  onFocus={() => setFormData({ ...formData, dedication: "Other" })
                }
                />
                <span className="focus-border" />
              </span>
            </label>
          </Col>
        </Row>
        </Form> */}    
            <div className='create-glowstick-button'>
            <Button
              id={formData.dedication ? "createBtn" : "createBtnNoHover"}
              onClick={createGlowstick}
              disabled={formData.dedication || timeoutCheck ? false : true}
              className="minimized-glowsticks"
            >
              <BsArrowUp/>
            </Button>
            </div>   
      
          </Container>
        </div>
      )}
    </>
  );
}

export default Glowsticks;
