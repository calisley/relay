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


function Utilities({ imageId, glowsticks, name }) {
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
  const [navToggle, setNavToggle] = useState(width > 1000);

  

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
    <div className="utilities">
    <div className="nav">
    {!navToggle ? 
      <div className='nav'>

      </div>
  : ""}
  </div>
  <div className="glowsticks">
      {!entryToggle ? (
        <div className="minimized-glowsticks"
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
      </div>
      </div>
  );
}

export default Utilities;
