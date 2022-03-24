import React, { useState } from 'react';
import './Reviews.css';
import Rating from '@mui/material/Rating';
import { useAlert } from "react-alert";
// import CloseIcon from '@mui/icons-material/Close';
// import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'


export default function Reviews(props) {

  const alert = useAlert();
  // alert.show(props.productId)

  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const [reviewList, setReviewList] = useState([]);
  const [reviewListLoading, setReviewListLoading] = useState(true);
  // const [reviewImages, setReviewImages] = useState([]);
  // const [review_images, setReviewImages] = useState([])
  // const review_images = [];
  let ProductIdChanged = "";

  const [myreview, setMyReview] = useState('nodata');

//   const fileParams = ({ meta }) => {
//     const body = new FormData()
//     // body.append('images', meta)
//     // return { url: 'https://httpbin.org/post', body }
//     return { url: 'https://httpbin.org/post' }
// }


// const onSubmit = (files, allFiles) => {
//     console.log("form data", files[0].file)
// }

// useEffect(()=>{
// document.getElementById
// }, [])

const getFilesFromEvent = e => {
  console.log("Uppdse Change", e)
    return new Promise(resolve => {
        getDroppedOrSelectedFiles(e).then(chosenFiles => {
            resolve(chosenFiles.map(f => f.fileObject))
        })
    })
}
const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg = 'ADD PHOTOS'
    return (
      <>
        <label className="review-add-photo-btn">
            {textMsg}
            <input
                style={{ display: 'none' }}
                type="file"
                accept={accept}
                multiple
                onChange={e => {
                    getFilesFromEvent(e).then(chosenFiles => {
                        onFiles(chosenFiles)
                    })
                }}
            />
        </label>
        {/* <div className='ab' id="dzu-submitButtonContainer2">
          <button class="dzu-submitButton">SUBMIT 2</button>
        </div> */}
        </>
    )
}


// function OnChangePreviewImages(e){
  // console.log("Change", e.file)
//   console.log("submit", document.getElementsByClassName("dzu-previewContainer"))
//   console.log("submit length", document.getElementsByClassName("dzu-previewContainer").length)
//  if(document.getElementsByClassName("dzu-previewContainer").length == 0){
//   document.getElementById("dzu-submitButtonContainer2").classList.add("hidden")
//   alert.show("0")
//  }
//  else{
//   document.getElementById("dzu-submitButtonContainer2").classList.remove("hidden")
//   alert.show("1")
//  }

// }
// const ReviewSubmitButton = ()=>{
//   return (
//     <div className="review-upload-image-submit-button">
//     <button>SUBMIT</button>
//   </div>
//   )
// }

  const createReview = async (files) => {
    try {
      if (!rating) {  
        alert.show('Please give some rating!');
        return;
      }
      if (!review) {
        alert.show('Please give review!');
        return;
      }
      const data = new FormData();
      // alert.show(`Ratings ${rating}`)
      data.append("rating", rating)
      data.append("review", review)

      for(let i in files){
        data.append("images", files[i].file)
      }
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/reviews/${props.productId}`,
        {
          method: 'POST',
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'multipart/form-data',
          // },
          body: data,
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        // alert(res.message);
        getMyReviews();
        getAllReviews();
      } else {
        alert.error('Something went wrong please try again.');
      }
    } catch (error) {
      alert.error('Something Went wrong try again');
      // console.log(error);
    }
  };

  const getAllReviews = async () => {
    // alert.show("Rev fetch")
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/reviews/${props.productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        setReviewList(res.data);
        // console.log('Reviews', res.data);
        setReviewListLoading(false);
      }
    } catch (error) {
      // console.log('Error Fetching reviews', error);
      setReviewListLoading(false);
    }
  };
  const getMyReviews = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/reviews/${props.productId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === 'success') {
        if (!res.data || res.data.length < 1) {
          setMyReview('notyet');
        } else {
          setMyReview('done');
        }
      }
    } catch (error) {
      console.log('Error Fetching reviews', error);
      setReviewListLoading(false);
    }
  };

  // useEffect(() => {
  //   alert.show("Re Rending")
  //   getAllReviews();
  //   getMyReviews();
  // },[])

  // if(ProductIdChanged !== `${props.productId}`){
  //   setReviewListLoading(true)
  //   setMyReview("nodata")
  //   // getAllReviews();
  //   // getMyReviews();
  //   ProductIdChanged = props.productId
  // }

  // const imageHandler = (e) => {
  //   var files = e.target.files; //FileList object
  //   let newImageArray = review_images;
  //   var output = document.getElementById('result');
  //   for (var i = 0; i < files.length; i++) {
  //     var file = files[i];
  //     newImageArray.push(file)
  //     //Only pics
  //     if (!file.type.match('image')) continue;
  //     var picReader = new FileReader();
  //     picReader.addEventListener('load', function (event) {
  //       var picFile = event.target;
  //       var div = document.createElement('div');
  //       div.innerHTML =
  //         "<div class='preview-image-div'><span>×</span><img class='review-upload-images' src='" + 
  //         picFile.result +
  //         "'" +
  //         "title='" +
  //         picFile.name +
  //         "'/></div>";
  //       output.insertBefore(div, null);
  //     });
  //     //Read the image
  //     picReader.readAsDataURL(file);
  //   }
  //   setReviewImages(newImageArray)
  // };
  function GetReviewdateTime(date) {
    let d = new Date(date);
    return d.toUTCString();
  }

  function renderReviewsList() {
    if (reviewListLoading) {
      getAllReviews();
      return <p>Loading...</p>;
    }
    return (
      <div
        style={{
          width: '100%',
        }}
      >
        {reviewList.map((review, i) => (
          <div
            key={i}
            style={{
              width: '100%',
              padding: '.5rem',
              marginTop: '1rem',
              borderTop: '1px solid lightgray',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                marginTop: '.6rem',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}
                >
                  {review.customer.first_name} {review.customer.last_name}
                </p>
                <br />
                <Rating
                  style={{
                    marginLeft: '.6rem',
                  }}
                  size="small"
                  value={review.rating}
                  precision={0.5}
                  readOnly
                />
              </div>
              <p>{GetReviewdateTime(review.updated_at)}</p>
            </div>
            <br />
            <div>
              <p
                style={{
                  fontSize: 16,
                  color: 'rgb(80, 80, 80)',
                }}
              >
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function RenderGiveReview() {
    if (myreview === 'nodata') {
      getMyReviews();
    }
    if (myreview === 'nodata' || myreview === 'given') {
      return <></>;
    } else if (myreview === 'notyet') {
      return (
        <div className="review-create-review-div">
          <p
            style={{
              fontSize: '1.6rem',
              color: 'rgb(80, 80, 80)',
            }}
          >
            Give Your Review
          </p>
          <br />
          <div className="review-create-review">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <p>Rating</p>
              <Rating
                style={{
                  marginLeft: '.6rem',
                }}
                size="small"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5}
              />
            </div>
            <br />
            <div>
              <p
                style={{
                  marginBottom: '.8rem',
                }}
              >
                Review
              </p>
              <textarea
                name="message"
                rows="4"
                style={{
                  width: '100%',
                  fontSize: '1.3rem',
                  padding: '.4rem',
                  fontStyle: 'revert',
                  border: '1px solid lightgray',
                }}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <br />
            {/* <div
              className="review-submit"
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row-reverse',
                // border: "1px solid blue"
              }}
            > */}
              {/* <div
                style={{
                  width: '22rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  // border: "1px solid red"
                }}
              >
                <label htmlFor="review-upload-image">
                  <input
                    name="review-upload-image"
                    id="review-upload-image"
                    type="file"
                    style={{
                      display: 'none',
                    }}
                    accept="image/*"
                    multiple
                    onChange={imageHandler}
                  />
                  <div className="review-upload-image-button">
                    <span>ADD PHOTOS</span>
                  </div>
                </label>
                <div className="review-upload-image-submit-button">
                  <button onClick={() => createReview()}>SUBMIT</button>
                </div>
              </div> */}
            <Dropzone
            onSubmit={createReview}
            InputComponent={selectFileInput}
            // getUploadParams={fileParams}
            // onChangeStatus={OnChangePreviewImages}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*"
            maxFiles={5}
            // SubmitButtonComponent={ReviewSubmitButton}
            submitButtonContent="SUBMIT"
            // inputContent="Drop A File"
            // submitButtonDisabled
        />
            {/* </div> */}
            <div
              id="result"
              // className='review-upload-images-div'
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                height: '6rem',
              }}
            >
              <output id="result" />
            </div>
          </div>
          <br />
          <br />
        </div>
      );
    }
  }

  return (
    <div className="review-div">
      <div className="review-holder">
        <div className="review-header">
          <div className="review-header-rating">
            <div
              style={{
                display: 'flex',
                flexFlow: 'row',
                alignItems: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '2.2rem',
                }}
              >
                {props.rating}
              </p>
              <Rating
                style={{ marginLeft: '1rem' }}
                value={parseFloat(props.rating)}
                size="large"
                precision={0.5}
                readOnly
              />
            </div>
            <br />
            <p>{props.numberOfReviews} Reviews</p>
          </div>
          {RenderGiveReview()}
          {renderReviewsList()}
        </div>
      </div>
      <div
        style={{
          width: '100%',
          height: '16vh',
          borderBottom: '1px solid lightgray',
        }}
      ></div>
    </div>
  );
}
