import React, { useState } from "react";
import Dialog from "part:@sanity/components/dialogs/fullscreen";
import debounce from "debounce";
import Fiona from "fiona";
import SVGIcon from "./svg-icon";

export default {
  title: "Fiona Placeholder",
  name: "fionaPlaceholder",
  icon: SVGIcon,
  component: props => {
    const [width, setWidth] = useState(100);
    const [height, setHeight] = useState(100);

    const setWidthDebounced = debounce(setWidth, 500);
    const setHeightDebounced = debounce(setHeight, 500);

    const Button = () => {
      const filename = `fiona-${Fiona().number()}.svg`;
      const img = Fiona(filename).img({ width, height });

      return (
        <button
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={() => {
            props.onSelect([
              {
                kind: "url",
                value: img,
                options: {
                  originalFilename: filename,
                  source: "fiona-generator"
                }
              }
            ]);
          }}
        >
          <img
            src={img}
            alt=""
            style={{
              height: 80
            }}
          />
        </button>
      );
    };

    return (
      <Dialog title="Choose an image" onClose={props.onClose} isOpen>
        <label>
          Height
          <br />
          <input
            type="text"
            onChange={evt => setHeightDebounced(evt.target.value)}
            defaultValue={height}
            placeholder="height"
          />
        </label>
        <br />
        <label>
          Width
          <br />
          <input
            type="text"
            onChange={evt => setWidthDebounced(evt.target.value)}
            defaultValue={width}
            placeholder="width"
          />
        </label>
        <br />
        {Array(100)
          .fill(null)
          .map((val, index) => (
            <Button key={index} />
          ))}
      </Dialog>
    );
  }
};
