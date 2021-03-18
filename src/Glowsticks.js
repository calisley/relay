import React, { useEffect, useState } from "react";
import { API, Storage } from "aws-amplify";

import { createGlowsick as createGlowstickMutation } from "./graphql/mutations";
import { getImage } from "./graphql/queries";

import { onCreateGlowsick } from "./graphql/subscriptions";

const initialFormState = { dedication: "", note: ""};

function Glowsticks({ imageId, glowsticks, setCurrentGlowsticks }) {

  const [formData, setFormData] = useState(initialFormState);
  const [liveGlowsticks, setLiveGlowsticks] = useState(glowsticks);

 

//   const subscription = API.graphql({ query: onCreateGlowsick }).subscribe({
//     next: ({ provider, value }) => {
//         console.log(provider);
//         console.log(value);
    
//       if (value.data.onCreateGlowsick.image.id == imageId) {
//         fetchGlowsticks();
//       }
//     },
//     error: (error) => {},
//   });


  async function createGlowstick() {
    if (!formData.dedication) return;
    await API.graphql({
      query: createGlowstickMutation,
      variables: {
        input: {glowsickImageId:imageId, ...formData}
      }});
    
  }

  return (
    <>
      {glowsticks ? (
        <>
          {glowsticks.map((comment) => (
            <>
            <h2>{comment.dedication}</h2>
            <>
            {comment.note? comment.note : ''}
            </>
            </>
          ))}
        </>
      ) : (
        <p>Loading!</p>
      )}

      <div className="glowstick-input-form">
        <input
          onChange={(e) =>
            setFormData({ ...formData, dedication: e.target.value })
          }
          placeholder="Glowstick dedication"
          value={formData.dedication}
        />
        <input
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
          placeholder="Glowstick note"
          value={formData.note}
        />
        <button onClick={createGlowstick}>Create Glowstick</button>
      </div>
    </>
  );
}

export default Glowsticks;
