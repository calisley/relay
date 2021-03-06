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
import Utilities from "./Util.js";


const initialFormState = { dedication: "", note: "" };

function App() {


  useEffect(() => {
    document.title = "Relay for Life";   }, []);

  const [ids, setIds] = useState([]);
  const [images, setImages] = useState([]);
  const [names, setNames] = useState([]);
  const [idsWithNames, setIdsWithNames] = useState([]);


  const [image, setImage] = useState();
  const [prevImage, setPrevImage] = useState();
  const [prevIndex, setPrevIndex] = useState();

  const [imageLoaded, setImageLoaded] = useState(false); 

  const [activeIndex, setActiveIndex] = useState();
  const [formData, setFormData] = useState(initialFormState);
  const [currentGlowSticks, setCurrentGlowsticks] = useState();

  const [nameForImage, setName] = useState();

  useEffect(() => {
    fetchCandles();
  }, []);

  useEffect(() => {
    if (ids[activeIndex]) {
      fetchImage(images[activeIndex]);
      fetchComments(ids[activeIndex]);
    }
    setImageLoaded(false);
  }, [activeIndex]);

  const handleSelect = (selectedIndex, e) => {
    setPrevImage(image);
    setPrevIndex(activeIndex);
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
    const apiData = await API.graphql({ query: listImages, variables: {limit: 200}});
    const imagesFromAPI = apiData.data.listImages.items;
    imagesFromAPI.sort((a, b) => {
      return a.createdAt > b.createdAt;
    });
    // maybe condense?
    const ids = [];
    const images = [];
    const names = [];
    const idsWithNames = [];
    await Promise.all(
      imagesFromAPI.map(async (img) => {
        // const image = await Storage.get(img.image);
        images.push(img.image);
        ids.push(img.id);
        names.push(img.name);
        idsWithNames.push({id:img.id, name:img.name})
      })
    );
    setIds(ids);
    setImages(images);
    setNames(names);
    setActiveIndex(0);
    setIdsWithNames(idsWithNames);
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
  async function fetchImage(img) {
    setImage('');
    const image = await Storage.get(img);
    setImage(image);
  }

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
              {index === activeIndex || prevIndex?
              <> 
               <Spinner animation="border" role="status" className={imageLoaded || index === prevIndex? 'hidden':''}>
               <span className="sr-only">Loading...</span>
             </Spinner>
            
              <img src={index === activeIndex ? image : prevImage} className={imageLoaded || index == prevIndex? '':'hidden'} onLoad={()=>{
                if(index === activeIndex){
                setImageLoaded(true)} 
               } }/>
              </>
              : ''}
            
              
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
          {ids[activeIndex] ? (
            <>
              <Utilities
                imageId={ids[activeIndex]}
                name={names[activeIndex]}
                glowsticks={currentGlowSticks}
                names={names}
                setActiveIndex={setActiveIndex}
                idsWithNames={idsWithNames}
              />
            </>
          ) : (
            ""
          )}
        
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
