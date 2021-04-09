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
import { BsArrowUp, BsSearch, BsX, BsArrowRight } from "react-icons/bs";
import { VscSearch } from "react-icons/vsc";
import { Typeahead } from "react-bootstrap-typeahead";
import { GiCandleLight } from "react-icons/gi";

import useWindowDimensions from "./useWindowDimensions";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function Utilities({ imageId, glowsticks, name, names, setActiveIndex }) {
  // state management

  const initialFormState = { dedication: name, note: "" };

  const [formData, setFormData] = useState(initialFormState);
  const [customDedication, setCustom] = useState();

  const [timeoutCheck, setTimeoutCheck] = useState(false);

  const { height, width } = useWindowDimensions();

  const [seachFilter, setSearchFilter] = useState("");
  const [searchUsed, setSearchUsed] = useState(false);
  const [selection, setSelection] = useState();
  const [renderedNames, setRenderedNames] = useState([names]);

  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (width < 1000) {
      setEntryToggle(false);
      setNavToggle(false);
    }
  
    
  }, [width]);

 

  const [entryToggle, setEntryToggle] = useState(width > 1000);
  const [navToggle, setNavToggle] = useState(width > 1000);

  useEffect(() => {
    setFormData({ ...formData, dedication: name });
  }, [name]);

  // refs for focus
  const input = useRef(null);

  const onRadioSelect = () => {
    input.current.focus();
  };

  useEffect(() => {
  
    if(width < 800){

      if(entryToggle){
        setNavToggle(false);
      }
    }
    
  }, [entryToggle]);

  useEffect(()=>{
    if(width < 800){
      if(navToggle){
        setEntryToggle(false);
      }
    }
   
  },[navToggle])

  // use effects

  useEffect(() => {
    setFormData({ dedication: name, note: "" });
    setSearchUsed(false);
    setSearchFilter('');
    setSearching(false);
    if(input.current != null){
    input.current.blur();
}
  }, [imageId]);

  useEffect(() => {
    const temp = names.filter((name) =>
      name.toLowerCase().startsWith(seachFilter.toLowerCase())
    );
    setRenderedNames(temp);
  }, [seachFilter]);

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
        {!navToggle ? (
          <div className={width < 600 && entryToggle ? "hidden" : "minimized-util"} onClick={() => setNavToggle(true)}>
            <VscSearch />
          </div>
        ) : (
          <div className="glowsticks-container">
            {renderedNames ? (
              <>
                <div
                  className="util-hider"
                  onClick={() => setEntryToggle(false)}
                >
                  <BsX />
                </div>
                <div className={width< 600? 'mobile-label' : 'hidden'}>
                    Search Luminaria
                </div>
                {renderedNames.length > 0 && (searching || width < 600)?  (
                  <div className="comments-container">
                    <div className="comments-viewport">
                      {renderedNames.map((name, index) => (
                        <div
                          className="comment"
                          key={index}
                          onMouseDown={(e)=> e.preventDefault()}
                          onClick={() => {
                            setActiveIndex(names.indexOf(name));
                            if(width < 600){
                              setNavToggle(false);
                            }

                          }}
                        >
                          <div className="glowstickIcon">
                            <GiCandleLight />
                          </div>
                          <div className="comment-text-wrapper-solo">
                            <Row>
                              <div className="dedication">
                                <p>{name}</p>
                              </div>
                            </Row>
                          </div>
                        </div>
                      ))}
                      <div className="comments-overlay"></div>
                    </div>
                  </div>
                ) : (
                  <>
                  {width < 600? <div className='comments-container'></div>:''}
                  </>
                )}
              </>
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}

            <Container className="glowstick-input-wrapper">
              <div className="searchIcon">
                <VscSearch />
              </div>
              <div className="input-with-effect">
                <input
                  autoFocus={searchUsed}
                  className="effect-1"
                  placeholder="Search for a luminaria..."
                  onChange={(e) => {
                    setSearchUsed(true);
                    setSearchFilter(e.target.value);
                  }}
                  onFocus={()=>setSearching(true)}
                  onBlur={()=>setSearching(false)}
                  value={seachFilter}
                  ref={input}
                />
                <span className="focus-border"></span>
              </div>
            </Container>
            <div className="util-hider" onClick={() => setNavToggle(false)}>
              <BsX />
            </div>
          </div>
        )}
      </div>
      <div className="glowsticks">
        {!entryToggle ? (
          <div className={width < 600 && navToggle? "hidden" : "minimized-util"} onClick={() => setEntryToggle(true)}>
            <IoMdColorWand />
          </div>
        ) : (
          <div className="glowsticks-container">
            {glowsticks ? (
              <>
                <div
                  className="util-hider"
                  onClick={() => setEntryToggle(false)}
                >
                  <BsX />
                </div>
                <div className={width< 600? 'mobile-label' : 'hidden'}>
                    Glowsticks
                </div>
               
                {glowsticks.length > 0 ? (
                  <div className="comments-container">
                    <div className="comments-viewport">
                      {glowsticks.map((comment) => (
                        <div className="comment" key={comment.id}>
                          <div className="glowstickIcon">
                            <IoMdColorWand />
                          </div>
                          <div
                            className={
                              comment.note
                                ? "comment-text-wrapper"
                                : "comment-text-wrapper-solo"
                            }
                          >
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
                ) : (
                  <>
                  {width < 600? <div className='comments-container'></div>:''}
                  </>
                )}
              </>
            ) : (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            )}
            <Container className="glowstick-input-wrapper">
              <Form.Group>
                <Form.Row>
                <Col xs="2">

                    <Form.Label>For: </Form.Label>
                </Col>
                <Col xs='10'>
                    <div className="input-with-effect">
                      <input
                        id="dedication"
                        disabled
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            dedication: e.target.value,
                          })
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
                <Col xs='2'>

                    <Form.Label>Note: </Form.Label>
                    </Col>
                    <Col xs='10'>

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
              <div className="create-glowstick-button">
                <Button
                  id={formData.dedication ? "createBtn" : "createBtnNoHover"}
                  onClick={createGlowstick}
                  disabled={formData.dedication || timeoutCheck ? false : true}
                  className="minimized-util"
                >
                  <BsArrowUp />
                </Button>
              </div>
            </Container>
          </div>
        )}
      </div></div>

  );
}

export default Utilities;
