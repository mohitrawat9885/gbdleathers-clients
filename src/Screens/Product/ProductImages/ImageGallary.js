import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import Zoom from 'react-medium-image-zoom';
import 'react-image-gallery/styles/css/image-gallery.css';

// import Grid from '@material-ui/core/Grid';

// import MyReactImageMagnify from './ReactImageMagnify';

class MyImageGallery extends Component {
  // myRenderItem() {
  //   return <MyReactImageMagnify {...this.props} />;
  // }

  myRenderItem(props) {
    return (
      <Zoom>
        <img src="https://placeimg.com/640/480/any/1" alt="" />
      </Zoom>
    );
  }
  render() {
    const properties = {
      thumbnailPosition: 'bottom',
      useBrowserFullscreen: false,
      showPlayButton: false,
      renderItem: this.myRenderItem.bind(this),
      items: [
        {
          original: 'https://placeimg.com/640/480/any/1',
          thumbnail: 'https://placeimg.com/250/150/any/1',
        },
        {
          original: 'https://placeimg.com/640/480/any/2',
          thumbnail: 'https://placeimg.com/250/150/any/2',
        },
        {
          original: 'https://placeimg.com/640/480/any/3',
          thumbnail: 'https://placeimg.com/250/150/any/3',
        },
      ],
    };

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'ro',
        }}
      >
        <ImageGallery {...properties} />
        <div
          style={{
            position: 'absolute',
          }}
          id="myPortal"
        />
      </div>
      // <Grid container spacing={4}>
      //   <Grid item xs={6}>

      //   </Grid>
      //   <Grid container spacing={2} item xs={6} direction="column">
      //     <Grid item>

      //     </Grid>
      //   </Grid>
      // </Grid>
    );
  }
}

export default MyImageGallery;
