import React, { Component } from "react";

import ReactImageMagnify from "react-image-magnify";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {},
});

class MyReactImageMagnify extends Component {
  render() {
    return (
      <ReactImageMagnify
        {...this.props}
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            isFluidWidth: true,
            src: "https://placeimg.com/640/480/any",
          },
          largeImage: {
            src: "https://placeimg.com/640/480/any",
            width: 640,
            height: 480,
          },
          enlargedImageContainerStyle: {
            zIndex: "1500",
          },
          enlargedImageContainerDimensions: {
            width: "100%",
            height: "100%",
          },
        }}
      />
    );
  }
}

export default withStyles(styles)(MyReactImageMagnify);
