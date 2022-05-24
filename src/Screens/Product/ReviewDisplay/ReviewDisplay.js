import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Zoom from "react-medium-image-zoom";
import ReactLoading from "react-loading";
import "./Reviews.css";
import "react-medium-image-zoom/dist/styles.css";

import { useAlert } from "react-alert";
// import GlobalState from "../../../GlobalState";
// import { Loading } from "../../../GlobalState";

export default function ReviewDisplay(props) {
  //   const [rating, setRating] = useState();

  // const [, setPageLoading] = React.useContext(Loading);
  const alert = useAlert();

  // const [reviewImages, setReviewImages] = useState([]);
  const [reviewImages, setReviewImages] = useState([]);
  const [reviewImagesLoading, setReviewImagesLoading] = useState(false);
  const [reviewSubmitButtonLoading, setReviewSubmitButtonLoading] =
    useState(false);

  const [reviewList, setReviewList] = useState();
  const [myReview, setMyReview] = useState(undefined);

  const [rating, setRating] = useState();
  const [review, setReview] = useState();
  const getAllReviews = async () => {
    // alert.show("Rev fetch")
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/reviews/${props.productVariantId.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        setReviewList(res.data);
      }
    } catch (error) {
      // console.log('Error Fetching reviews', error);
      //   setReviewListLoading(false);
    }
  };

  const getMyReviews = async () => {
    try {
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/reviews/${props.productVariantId?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = JSON.parse(await response.text());
      // console.log(res)
      if (res.status === "success" && !res.data[0]) {
        // console.log("My Review", res.data);
        setMyReview(res.data);
      } else {
        setMyReview(undefined);
      }
      //   setMyReviewLoading(false);
    } catch (error) {
      setMyReview(undefined);
    }
  };

  const createReview = async (files) => {
    try {
      if (!rating) {
        alert.show("Please give some rating!");
        return;
      }
      if (!review) {
        alert.show("Please give review!");
        return;
      }
      setReviewSubmitButtonLoading(true);
      const data = new FormData();
      // alert.show(`Ratings ${rating}`)
      data.append("rating", rating);
      data.append("review", review);

      for (let i in reviewImages) {
        data.append("images", reviewImages[i].file);
      }
      const response = await fetch(
        `/api/v1/gbdleathers/client/customer/reviews/${props.productVariantId.id}`,
        {
          method: "POST",
          // headers: {
          //   'Accept': 'application/json',
          //   'Content-Type': 'multipart/form-data',
          // },
          body: data,
        }
      );
      const res = JSON.parse(await response.text());
      if (res.status === "success") {
        // alert(res.message);
        setReviewImages(null);
        setRating(null);
        getMyReviews();
        getAllReviews();
        setReviewSubmitButtonLoading(false);
      } else {
        alert.error("Something went wrong please try again.");
        setReviewSubmitButtonLoading(false);
      }
    } catch (error) {
      alert.error("Something Went wrong try again");
      setReviewSubmitButtonLoading(false);
      // console.log(error);
    }
  };

  function GetImageUploadButton() {
    if (reviewImagesLoading === true) {
      return (
        <span>
          <ReactLoading type="spin" color="black" height={25} width={25} />
        </span>
      );
    }
    return <span>ADD PHOTOS</span>;
  }
  function GetReviewSubmitImage() {
    if (reviewSubmitButtonLoading === true) {
      return (
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReactLoading type="spin" color="white" height={28} width={25} />
        </button>
      );
    }

    return <button onClick={() => createReview()}>SUBMIT</button>;
  }

  async function imageHandler(e) {
    setReviewImagesLoading(true);
    var files = e.target.files;

    if (files.length + reviewImages.length > 5) {
      alert.show("Maximum 5 Images are allowed!");
      return;
    }
    let newImageArray = [];
    for (let j in reviewImages) {
      newImageArray.push(reviewImages[j]);
    }

    // console.log(files.length);
    for (let i = 0; i < files.length; i++) {
      // console.log(i);
      let fileObj = {
        data: URL.createObjectURL(files[i]),
        file: files[i],
      };
      newImageArray.push(fileObj);
    }
    // console.log("done loading.. Images");
    setReviewImages(newImageArray);
    setReviewImagesLoading(false);
  }

  React.useEffect(() => {
    if (props.productVariantId?.id) {
      getAllReviews();
      getMyReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.productVariantId]);

  function RenderGiveReview() {
    if (myReview && Object.keys(myReview).length === 0) {
      return (
        <div className="review-create-review-div">
          <p
            style={{
              fontSize: "1.6rem",
              color: "rgb(80, 80, 80)",
            }}
          >
            Give Your Review
          </p>
          <br />
          <div className="preview-create-review">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: 'center'
              }}
            >
              <p>Rating</p>
              <Rating
                style={{
                  marginLeft: "1rem",
                }}
                size="medium"
                value={parseFloat(rating)}
                onChange={(event, newValue) => setRating(newValue)}
                precision={0.5}
                // readOnly
              />
            </div>
            <br />
            <div>
              <p
                style={{
                  marginBottom: ".8rem",
                }}
              >
                Review
              </p>
              <textarea
                name="message"
                rows="4"
                style={{
                  width: "100%",
                  fontSize: "1.3rem",
                  padding: ".4rem",
                  fontStyle: "revert",
                  border: "1px solid lightgray",
                }}
                onChange={(e) => setReview(e.target.value)}
              ></textarea>
            </div>
            <br />

            <div
              className="review-submit"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
                // border: "1px solid blue"
              }}
            >
              <div
                style={{
                  width: "22rem",
                  display: "flex",
                  justifyContent: "space-between",
                  // border: "1px solid red"
                }}
              >
                <label htmlFor="review-upload-image">
                  <input
                    name="review-upload-image"
                    id="review-upload-image"
                    type="file"
                    style={{
                      display: "none",
                    }}
                    accept="image/*"
                    multiple
                    onChange={imageHandler}
                  />
                  <div className="review-upload-image-button">
                    <GetImageUploadButton />
                  </div>
                </label>
                <div className="review-upload-image-submit-button">
                  <GetReviewSubmitImage />
                </div>
              </div>
            </div>
            <div
              id="result"
              // className="review-upload-images-div"
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                height: "6rem",
              }}
            >
              {reviewImages?.map((file, index) => (
                <div class="preview-image-div" key={index}>
                  <span
                    style={{
                      float: "right",
                      fontSize: "1.2rem",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      let newImageArray = [];
                      for (let i in reviewImages) {
                        // console.log(i, " ", index);
                        if (Number(i) === Number(index)) continue;
                        newImageArray.push(reviewImages[i]);
                      }
                      setReviewImages(newImageArray);
                    }}
                  >
                    ×
                  </span>
                  <img class="review-upload-images" src={file.data} alt="" />
                </div>
              ))}
              {/* <output id="result" /> */}
            </div>
          </div>
          <br />
          <br />
        </div>
      );
    } else {
      return <></>;
    }
  }

  function GetReviewdateTime(date) {
    let d = new Date(date);
    return d.toUTCString();
  }

  function renderReviewsList() {
    return (
      <div
        style={{
          width: "100%",
        }}
      >
        {reviewList?.map((review, i) => (
          <div
            key={i}
            style={{
              width: "100%",
              padding: ".5rem",
              marginTop: "1rem",
              borderTop: "1px solid lightgray",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                marginTop: ".6rem",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {review.customer.first_name} {review.customer.last_name}
                </p>
                <br />
                <Rating
                  style={{
                    marginLeft: ".6rem",
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
                  color: "rgb(80, 80, 80)",
                }}
              >
                {review.review}
              </p>
            </div>
            <br />
            <br />
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                // justifyContent: 'space-between',
              }}
            >
              {review?.images?.map((img, index) => (
                <div
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    marginRight: "1rem",
                  }}
                >
                  <Zoom>
                    <img src={`${global.image_path}${img}`} alt="" />
                  </Zoom>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="review-div">
      <div className="review-holder">
        <div className="review-header">
          <div className="review-header-rating">
            <div
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  fontSize: "2.2rem",
                }}
              >
                {props.productVariantId?.ratingsAverage}
              </p>
              <Rating
                style={{ marginLeft: "1rem" }}
                value={parseFloat(props.productVariantId?.ratingsAverage)}
                size="large"
                precision={0.5}
                readOnly
              />
            </div>
            <br />
            <p>{props.productVariantId?.ratingsQuantity} Reviews</p>
          </div>
          {RenderGiveReview()}
          {renderReviewsList()}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "16vh",
          borderBottom: "1px solid lightgray",
        }}
      ></div>
    </div>
  );
}
