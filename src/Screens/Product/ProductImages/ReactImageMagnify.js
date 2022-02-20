import React, { Component } from 'react';
import { SideBySideMagnifier } from 'react-image-magnifiers';

class SideExample extends Component {
  props = {
    alwaysInPlace: false,
    overlayOpacity: 0.5,
    switchSides: false,
    fillAvailableSpace: true,
    fillAlignTop: false,
    fillGapLeft: 0,
    fillGapRight: 10,
    fillGapTop: 10,
    fillGapBottom: 10,
  };

  render() {
    const {
      alwaysInPlace,
      overlayOpacity,
      switchSides,
      fillAvailableSpace,
      fillAlignTop,
      fillGapLeft,
      fillGapRight,
      fillGapTop,
      fillGapBottom,
    } = this.props;

    return (
      <React.Fragment>
        <SideBySideMagnifier
          //  className="input-position"
          style={{ order: switchSides ? '1' : '0' }}
          imageSrc={
            'https://adamrisberg.github.io/react-image-magnifiers/4700d4cb26b14563be996aa5f0c53ca2.jpg'
          }
          largeImageSrc={
            'https://adamrisberg.github.io/react-image-magnifiers/4700d4cb26b14563be996aa5f0c53ca2.jpg'
          }
          alwaysInPlace={alwaysInPlace}
          overlayOpacity={overlayOpacity}
          switchSides={switchSides}
          zoomPosition="right"
          inPlaceMinBreakpoint={641}
          fillAvailableSpace={fillAvailableSpace}
          fillAlignTop={fillAlignTop}
          fillGapTop={fillGapTop}
          fillGapRight={fillGapRight}
          fillGapBottom={fillGapBottom}
          fillGapLeft={fillGapLeft}
          zoomContainerBorder="1px solid #ccc"
          zoomContainerBoxShadow="0 4px 8px rgba(0,0,0,.5)"
        />
      </React.Fragment>
    );
  }
}

export default SideExample;
