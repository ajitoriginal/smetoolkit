import React, { useEffect, useRef, useState } from "react";
import styles from "./infographics.module.scss";
import PrimaryButton from "../../atoms/primary-button";
import Loader from "../../atoms/loader";
import useInfographicImagesStore from "../../stores/infographicImages";
import { toast } from "react-toastify";

const InfographicImages = ({ templateID, templateName }) => {
  const {
    allInfographics,
    infographicsLoader,
    infographicsError,
    selectedImages,
    setSelectedImages,
    fetchInfographicImages,
    createInfographicImagePaths,
    getInfographicUploadUrls,
    deleteInfographicImages,
  } = useInfographicImagesStore();

  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchInfographicImages(templateID);
  }, [fetchInfographicImages, templateID]);

  function handleUploadClick() {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  }

  async function handleFilesSelected(event) {
    const files = Array.from(event?.target?.files || []);
    if (!files.length) return;
    
    if (files.length > 10) {
      toast.error("You can only upload up to 10 images at a time");
      if (event?.target) event.target.value = "";
      return;
    }

    // Check for invalid file types
    const invalidFiles = files.filter(file => 
      !['image/jpeg', 'image/jpg'].includes(file.type.toLowerCase())
    );
    
    if (invalidFiles.length > 0) {
      toast.error("Only JPG/JPEG files are allowed");
      if (event?.target) event.target.value = "";
      return;
    }
    
    setUploading(true);
    try {
      const timestamp = Date.now();
      const titles = files.map((_, index) => `${timestamp}${index}`);

      const preSignResp = await getInfographicUploadUrls({
        templateId: templateID,
        images: titles.map((t) => ({ imageTitle: t })),
      });
      const signedList = preSignResp?.body || preSignResp || [];

      await Promise.all(
        files.map(async (file, index) => {
          const signURLObject = signedList[index];
          if (!signURLObject?.uploadURL) return;
          await fetch(`${signURLObject.uploadURL}`, {
            method: "PUT",
            body: file,
          });
        }),
      );

      const imagesForPath = signedList
        .map((sign) => ({
          imageTitle: sign?.imageTitle,
          imageKey: sign?.Key,
        }))
        .filter((x) => x.imageKey);

      if (imagesForPath.length) {
        await createInfographicImagePaths({
          templateId: templateID,
          images: imagesForPath,
        });
      }

      toast.success("Images Uploaded Successfully")

      fetchInfographicImages(templateID);
    } catch (error) {
      console.error('error in file upload -> ', error)
    } finally {
      setUploading(false);
      if (event?.target) event.target.value = "";
    }
  }

  function getImageUrl(item) {
    const img = item?.template_image ? item.template_image : item;
    if (!img) return "";
    if (img.location && img.thumbImageKey)
      return `${img.location}${img.thumbImageKey}`;
    if (img.location && img.originalImageKey)
      return `${img.location}${img.originalImageKey}`;
    if (img.url) return img.url;
    return "";
  }

  function getImageName(item) {
    const url = getImageUrl(item);
    if (!url) return "";
    try {
      return url.split("/").pop();
    } catch (_) {
      return "";
    }
  }

  function handleImageSelect(item) {
    console.log('allInfographics', allInfographics)
    const img = item;
    if (!img?.templateImageId) return;

    const isSelected = selectedImages.some(x => x.templateImageId === img.templateImageId);
    const newSelectedImages = isSelected 
      ? selectedImages.filter(x => x.templateImageId !== img.templateImageId)
      : [...selectedImages, img];
    
    setSelectedImages(newSelectedImages);
  }

  async function handleDeleteSelected() {
    if (!selectedImages.length) return;
    setDeleting(true);
    try {
      await deleteInfographicImages({
        templateId: templateID,
        images: selectedImages.map(img => img.templateImageId)
      });
      setSelectedImages([]);
      toast.success("Selected images deleted successfully");
      fetchInfographicImages(templateID);
    } catch (error) {
      console.error('error deleting images -> ', error);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerRow}>
        <div className={styles.title}>Infographic Images</div>
        <div className={styles.actions}>
          {selectedImages.length > 0 && (
            <>
              <button
                className={styles.clearButton}
                onClick={() => setSelectedImages([])}
                disabled={deleting}
              >
                Clear Selection
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteSelected}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Selected"}
              </button>
            </>
          )}
          <PrimaryButton
            text={uploading ? "Please wait..." : "Upload"}
            onClick={handleUploadClick}
            disabled={uploading}
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg"
          multiple
          maxLength={10}
          onChange={handleFilesSelected}
          style={{ display: "none" }}
        />
      </div>

      {infographicsLoader && <Loader />}

      {!infographicsLoader && infographicsError && (
        <div className={styles.error}>{infographicsError}</div>
      )}

      {!infographicsLoader && !infographicsError && (
        <div className={styles.grid}>
          {(allInfographics || []).map((item, index) => {
            const src = getImageUrl(item);
            const name = getImageName(item);
            return (
              <div 
                className={`${styles.card} ${selectedImages.some(x => x.templateImageId === item?.templateImageId) ? styles.selected : ''}`} 
                key={index}
                onClick={() => handleImageSelect(item)}
              >
                <div 
                  className={styles.checkbox}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageSelect(item);
                  }}
                >
                  <input 
                    type="checkbox" 
                    checked={selectedImages.some(x => x.templateImageId === (item?.template_image?.templateImageId || item?.templateImageId))}
                    onChange={() => {}} // Added to prevent React warning about controlled component
                  />
                </div>
                {src ? (
                  <img
                    className={styles.image}
                    src={src}
                    alt={name || "infographic"}
                  />
                ) : (
                  <div className={styles.placeholder} />
                )}
                {/* {name && <div className={styles.imageName}>{name}</div>} */}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InfographicImages;
