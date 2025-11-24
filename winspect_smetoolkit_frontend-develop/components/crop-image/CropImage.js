import React, { useEffect, useRef, useState } from "react";

import Cropper from "react-cropper";
import style from "./style.module.scss";
import "cropperjs/dist/cropper.css";
import { APIurl } from "../../utils/storage";
import { useRouter } from "next/router";
import useTemplateStore from "../../stores/templateStore";
import RemarkServices from "../../api/services/RemarkServices";
import useRemarkStore from "../../stores/remarkStore";
import { toast } from "react-toastify";
export default function CropImage(props) {
  const router = useRouter();
  const { currentTemplateDetail } = useTemplateStore();

  const [local, setlocal] = useState();
  const [loader, setLoader] = useState(false);
  const [left, setLeft] = useState(0);
  const {
    reloadRemarks,
    remarkImageToUpload,
    setRemarkImageToUpload,
    remarkIdToUploadImage,
    selectedRemarkImagesLengthStore,
  } = useRemarkStore();
  const cropperRef = useRef(null);
  useEffect(() => {
    const isStored = typeof window !== "undefined" && window.localStorage;
    const local = isStored && JSON.parse(localStorage.getItem("userInfo"));
    setlocal(local);
  }, []);

  useEffect(() => {
    if (remarkImageToUpload.length > 0) {
      setTimeout(() => {
        makeCroperBig();
      }, 1);
    }
  }, [remarkImageToUpload]);

  const fitToContainer = () => {
    const cropper = cropperRef.current?.cropper;
    cropper.setCropBoxData({
      width: 400, // Desired width
      height: 400, // Desired height
      left: 70,
      top: 0,
    });
    if (cropper.canvasData.width > cropper.canvasData.height) {
      cropper.setCanvasData({
        width: 400,
      });
    } else {
      cropper.setCanvasData({
        height: 400,
      });
    }

    if (cropper.canvasData.width > cropper.canvasData.height) {
      cropper.setCanvasData({
        left: 70, //
        top: (-1 * (cropper.canvasData.height - 400)) / 2,
      });
    } else {
      cropper.setCanvasData({
        left,
        top: 0,
      });
    }
  };

  const makeCroperBig = () => {
    const cropper = cropperRef.current?.cropper;
    setLeft(cropper.canvasData.left);
    if (cropper) {
      cropper.setCropBoxData({
        width: 400, // Desired width
        height: 400, // Desired height
        left: 70,
      });
    }
  };
  useEffect(() => {}, [remarkImageToUpload]);
  const api = APIurl();

  async function tempPresignedFun(image) {
    if (image) {
      try {
        let result = await fetch(
          `${api}api/v1/template/remark/image/presigned-url?templateId=${currentTemplateDetail.templateId}&version=${currentTemplateDetail.version}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "image/jpg",
              Accept: "*",
              Authorization: `Bearer ${local?.body.winspectSMEtoolkit.accessToken}`,
            },
          },
        );
        result = await result.json();
        const data = {
          originalImageKey: result.body.Key,
          templateRemarkId: remarkIdToUploadImage,
          orderNumber: selectedRemarkImagesLengthStore + 1,
          uploadStatus: "uploaded",
        };

        const uploadImageResp = await fetch(`${result.body.uploadURL}`, {
          method: "PUT",
          body: image,
        });
        if (uploadImageResp.status === 200) {
          const resp = await RemarkServices.addRemarkImage(data, router);
          if (resp.status === 200) {
            reloadRemarks();
            setRemarkImageToUpload([]);
          }
        }
        setLoader(false);
      } catch (error) {
        setRemarkImageToUpload([]);
        toast.error("Something went wrong, please try later");
        setLoader(false);
      }
    }
  }

  const onCropComplete = () => {
    setLoader(true);
    const cropper = cropperRef.current.cropper;
    const croppedCanvas = cropper.getCroppedCanvas();

    // Create a new canvas with a white background
    const whiteBackgroundCanvas = document.createElement("canvas");
    const context = whiteBackgroundCanvas.getContext("2d");

    // Set the size of the new canvas to match the cropped canvas
    whiteBackgroundCanvas.width = croppedCanvas.width;
    whiteBackgroundCanvas.height = croppedCanvas.height;

    // Fill the new canvas with a white background
    context.fillStyle = "#FFFFFF";
    context.fillRect(
      0,
      0,
      whiteBackgroundCanvas.width,
      whiteBackgroundCanvas.height,
    );

    // Draw the cropped image onto the new canvas with the white background
    context.drawImage(croppedCanvas, 0, 0);

    // Convert canvas to Blob if needed (e.g., for uploading)
    whiteBackgroundCanvas.toBlob((blob) => {
      tempPresignedFun(blob);
    }, "image/jpeg");
  };

  const handleCancel = () => {
    setRemarkImageToUpload([]);
  };

  return (
    <div className="App">
      <div className={style.cropper}>
        {remarkImageToUpload[0]?.data_url && (
          <div className={`${style.cropPopupWrapper}`}>
            <div className={style.cropPopup}>
              <div className={style.cropArea}>
                <div className={style.fitToScreenBtn} onClick={fitToContainer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="black"
                      fill-opacity="0.6"
                    />
                    <path
                      d="M16 8H24V16"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M16 24H8V16"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <Cropper
                  src={remarkImageToUpload[0]?.data_url}
                  style={{
                    height: 400,
                    width: 540,
                    borderRadius: "10px",
                  }}
                  // Cropper.js options
                  // initialAspectRatio={1}
                  aspectRatio={1}
                  // aspectRatio={16 / 9}
                  guides={false}
                  ref={cropperRef}
                  cropBoxResizable={true}
                  cropBoxMovable={true}
                  dragMode="move"
                />
              </div>
              <div className={style.buttonWrapper}>
                {loader ? (
                  <button className={style.primaryBtn}>Please wait</button>
                ) : (
                  <>
                    <button
                      className={style.secondaryBtn}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button
                      className={style.primaryBtn}
                      onClick={onCropComplete}
                    >
                      Save Image
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
