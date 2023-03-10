import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { InstaLogin, FacebookLogin, TwitterLogin } from "./socialLogins.tsx";

const socialMediaList = [
  {
    id: "facebook",
    name: "Facebook",
    component: <FacebookLogin />,
  },
  {
    id: "instagram",
    name: "Instagram",
    component: <InstaLogin />,
  },
  {
    id: "twitter",
    name: "Twitter",
    component: <TwitterLogin />,
  },
];

function App() {
  const [socialMedia, setSocialMedia] = useState(socialMediaList);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(socialMedia);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSocialMedia(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Social Login</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="socialMedia">
            {(provided) => (
              <ul
                className="social-media-link"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {socialMedia.map(({ id, name, component }, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {/* <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div> */}
                          <p>{name}</p>
                          {component}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
