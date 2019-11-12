import React, { useState, useEffect } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { api } from "../utils/api";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  //boolean to re-render page when deleting an item
  const [deleted, setDeleted] = useState(false)

  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    api().get('/colors')
      .then(res => setColorList(res.data))
      .catch(err => console.log(err))
  }, [deleted])
  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} setDeleted={setDeleted} deleted={deleted} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
