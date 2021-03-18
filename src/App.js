import React, { useState, useEffect } from "react";
import "./App.css";
import { listImages, listGlowsicks, getImage } from "./graphql/queries";
import {
  createImage as createImageMutation,
  deleteCandle as deleteCandleMutation,
} from "./graphql/mutations";
import { API, Storage } from "aws-amplify";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Glowsticks from "./Glowsticks.js";
import { onCreateGlowsick } from "./graphql/subscriptions";

const initialFormState = {dedication:'', note:''}

function App() {
  const [ids, setIds] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [formData, setFormData] = useState(initialFormState);

  const [currentImage, setCurrentImage] = useState();
  const [currentGlowSticks, setCurrentGlowsticks] = useState();

  useEffect(() => {
    fetchCandles();
  }, []);



  useEffect(() => {
    if (ids[activeIndex]) {
      fetchImage(ids[activeIndex]);
    }

  }, [activeIndex]);


 

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
    const ids = [];
    await Promise.all(
      imagesFromAPI.map(async (img) => {
        // const image = await Storage.get(img.image);
        ids.push(img.id);
      })
    );
    setIds(ids);
    setActiveIndex(0);
  }
  async function createImage() {
    if (!formData.image) return;
    await API.graphql({
      query: createImageMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    // setImages([...images, formData]);
    setFormData();
  }
  async function fetchImage(imageId) {
    const apiData = await API.graphql({
      query: getImage,
      variables: { id: imageId },
    });
    const comments = apiData.data.getImage.comments.items;
    const image = await Storage.get(apiData.data.getImage.image);

    setCurrentImage(image);
    setCurrentGlowsticks(comments);

  }

  useEffect(()=>{
    const subscription = API.graphql({query:onCreateGlowsick, variables:{glowsickImageId:ids[activeIndex]}}).subscribe({
      next: data=> fetchImage(ids[activeIndex])
    })

    return () =>subscription.unsubscribe();
  },[activeIndex]);



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
      <Container fluid>
        {/* <input type="file" onChange={onImageChange} />
        <button onClick={createImage}>Create image</button> */}

        <div className="images">
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
          )}
        </div>

        <div className="glowsticks">
          {ids[activeIndex] ? (
            <>
              <Glowsticks imageId={ids[activeIndex]} glowsticks={currentGlowSticks} />
            </>
          ) : (
            ""
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
