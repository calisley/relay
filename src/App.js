import React, { useState, useEffect } from "react";
import "./App.css";
import { listImages, getImage } from "./graphql/queries";
import { createImage as createImageMutation } from "./graphql/mutations";
import { API, Storage } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Glowsticks from "./Glowsticks.js";
import { onCreateGlowsick } from "./graphql/subscriptions";
import Spinner from 'react-bootstrap/Spinner'
import "./glowsticks.css";
import logo from './relay-logo.png';
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs';


const initialFormState = { dedication: "", note: "" };

function App() {
  const [ids, setIds] = useState([]);
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);


  const [activeIndex, setActiveIndex] = useState();
  const [formData, setFormData] = useState(initialFormState);
  const [currentGlowSticks, setCurrentGlowsticks] = useState();

  const [nameForImage, setName] = useState();

  useEffect(() => {
    fetchCandles();
  }, []);

  useEffect(() => {
    if (ids[activeIndex]) {
      fetchComments(ids[activeIndex]);
    }
  }, [activeIndex, ids]);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
    if (ids[activeIndex]) {
      fetchComments(ids[selectedIndex]);
    }
  };

  async function onImageChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchCandles();
  }
  async function fetchCandles() {
    const apiData = await API.graphql({ query: listImages });
    const imagesFromAPI = apiData.data.listImages.items;
    imagesFromAPI.sort((a, b) => {
      return a.createdAt > b.createdAt;
    });
    // maybe condense?
    const ids = [];
    const images = [];
    const names = [];
    await Promise.all(
      imagesFromAPI.map(async (img) => {
        const image = await Storage.get(img.image);
        images.push(image);
        ids.push(img.id);
        names.push(img.name);
      })
    );
    setIds(ids);
    setImages(images);
    setNames(names);
    setActiveIndex(0);
  }
  async function createImage() {
    if (!formData.image) return;
    await API.graphql({
      query: createImageMutation,
      variables: { input: {image:formData.image, name:nameForImage} },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    // setImages([...images, formData]);
    setName();
    setFormData();
  }
  // async function fetchImage(imageId) {
  //   const apiData = await API.graphql({
  //     query: getImage,
  //     variables: { id: imageId },
  //   });
  //   const comments = apiData.data.getImage.comments.items;

  //   setCurrentGlowsticks(comments);
  // }

  async function fetchComments(imageId) {
    const apiData = await API.graphql({
      query: getImage,
      variables: { id: imageId },
    });
    const comments = apiData.data.getImage.comments.items;

    comments.sort((a, b) => {
      return a.createdAt < b.createdAt;
    });

    setCurrentGlowsticks(comments);
  }

  useEffect(() => {
    
    const subscription = API.graphql({
      query: onCreateGlowsick,
      variables: { glowsickImageId: ids[activeIndex] },
    }).subscribe({
      next: (data) => fetchComments(ids[activeIndex]),
    });

    return () => subscription.unsubscribe();
  }, [activeIndex]);

  // async function deleteNote({ id }) {
  //   const newNotesArray = notes.filter((note) => note.id !== id);
  //   setNotes(newNotesArray);
  //   await API.graphql({
  //     query: deleteCandleMutation,
  //     variables: { input: { id } },
  //   });
  // }

  return (
    <div className="App">
      {ids[activeIndex] ? 
      <Container fluid>
        {/* <input type="file" onChange={onImageChange} />
        <input type="text" value={nameForImage} onChange={(e)=>{setName(e.target.value)}}/>
        <button onClick={createImage}>Create image</button> */}
        <Carousel
          activeIndex={activeIndex}
          onSelect={handleSelect}
          indicators={false}
          interval={null}
          className="images"
          prevIcon={<BsChevronLeft/>}
          nextIcon={<BsChevronRight/>}
          
        >
          {ids.map((id, index) => (
            <Carousel.Item key={id} index={index}>
              <img src={images[index]} />
            </Carousel.Item>
          ))}

          {/* <button
             onClick={() => {
               setActiveIndex((activeIndex + 1) % ids.length);
             }}
           >
             Next
           </button>
           <button
             onClick={() => {
               setActiveIndex(
                 (((activeIndex - 1) % ids.length) + ids.length) % ids.length
               );
             }}
           >
             Prev
           </button> */}
        </Carousel>
        {/* <Carousel className="images">
          {ids[activeIndex] ? (
            <>
              {currentImage && (
                <img src={currentImage} />
              )}
              <button
                onClick={() => {
                  setActiveIndex((activeIndex + 1) % ids.length);
                }}
              >
                Next
              </button>
              <button
                onClick={() => {
                  setActiveIndex(
                    (((activeIndex - 1) % ids.length) + ids.length) % ids.length
                  );
                }}
              >
                Prev~
              </button>
            </>
          ) : (
            <p>Loading!</p>
          )} }
        </Carousel>
          */}
        <div className="glowsticks">
          {ids[activeIndex] ? (
            <>
              <Glowsticks
                imageId={ids[activeIndex]}
                name={names[activeIndex]}
                glowsticks={currentGlowSticks}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
      :
      <div className='loading-background'>
<img src={logo} alt="Relay for Life's logo"/>
<Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>      </div>
      }
    </div>
  );
}

export default App;
