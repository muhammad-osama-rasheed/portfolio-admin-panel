import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import styles from "./ProfileModal.module.css";
import toast from "react-hot-toast";
import Loader from "../../../components/loader/Loader";

function ProfileModal({
  showProfileModal,
  setShowProfileModal,
  profile,
  profileId,
  getProfile,
}) {
  const [image, setImage] = useState("");
  const [tempImage, setTempImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [newImage, setNewImage] = useState("");

  const handleImageChange = (e) => {
    setTempImage(URL.createObjectURL(e.target.files[0]));

    if (profile && profile !== "") {
      setNewImage(e.target.files[0]);
    } else {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);

      const response = await fetch(import.meta.env.VITE_API_URL_PROFILE, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("jwtToken"),
        },
        body: formData,
      });

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        getProfile();
        toast.success(message || "Image uploaded successfully!");
      } else {
        toast.error(message || "No Image Uploaded.");
      }
    } catch (error) {
      console.log("Error uploading image", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateImage = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("newimage", newImage);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_PROFILE}/${profileId}`,
        {
          method: "PUT",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
          body: formData,
        }
      );

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        getProfile();
        toast.success(message || "Image updated successfully.");
      } else {
        toast.error(message || "No Image Uploaded.");
      }
    } catch (error) {
      console.log("Error uploading image", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL_PROFILE}/${profileId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: localStorage.getItem("jwtToken"),
          },
        }
      );

      const result = await response.json();
      const { success, message } = result;

      if (success) {
        getProfile();
        toast.success(message || "Profile deleted successfully.");
      } else {
        toast.error(message || "Failed to delete profile.");
      }
    } catch (error) {
      console.log("Error deleting profile image", error);
      toast.error("Failed to delete profile image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <Modal
        show={showProfileModal}
        centered
        onHide={() => {
          setShowProfileModal(false);
          setImage("");
          setTempImage("");
          setNewImage("");
        }}
        keyboard={true}
        backdrop="static"
        size="sm"
      >
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-12 text-end">
                <img
                  onClick={() => {
                    setShowProfileModal(false);
                    setImage("");
                    setTempImage("");
                    setNewImage("");
                  }}
                  className={styles["cancel-icon"]}
                  style={{ width: "14px", height: "14px", cursor: "pointer" }}
                  src="/images/cancel.png"
                  alt="cancel-icon"
                />
              </div>
            </div>

            <div className="row my-4 justify-content-center align-items-center">
              <div className="col-12 d-flex justify-content-center align-items-center">
                <img
                  src={
                    tempImage && tempImage !== ""
                      ? tempImage
                      : profile && profile !== ""
                      ? `data:image/*;base64,${profile}`
                      : "/images/mypic.jpg"
                  }
                  alt="Profile Pic"
                  className="rounded-circle"
                  style={{ width: "150px", height: "150px" }}
                />
              </div>

              <div className="row pt-4 mt-3 ">
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="d-none"
                    id="fileInput"
                    onChange={handleImageChange}
                    name={profile && profile !== "" ? "newimage" : "image"}
                  />
                  <label
                    htmlFor="fileInput"
                    className={styles["border-button"]}
                  >
                    {image || newImage ? "CHANGE PHOTO" : "Select from Device"}
                  </label>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <div
                    onClick={() => {
                      if (
                        profile &&
                        profileId &&
                        profile !== "" &&
                        profileId !== ""
                      ) {
                        handleUpdateImage();
                        setShowProfileModal(false);
                        setImage("");
                        setTempImage("");
                        setNewImage("");
                      } else {
                        handleUpload();
                        setShowProfileModal(false);
                        setImage("");
                        setTempImage("");
                        setNewImage("");
                      }
                    }}
                    className={styles["bg-button"]}
                  >
                    UPLOAD PHOTO
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center align-items-center">
                  <div
                    onClick={() => {
                      if (profile !== "" && profile.id !== "") {
                        handleDelete();
                      }

                      setShowProfileModal(false);
                      setImage("");
                      setTempImage("");
                      setNewImage("");
                    }}
                    className={styles["bg-button"]}
                  >
                    {profile !== "" && profile.id !== ""
                      ? "DELETE PROFILE PHOTO"
                      : "CANCEL"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModal;
