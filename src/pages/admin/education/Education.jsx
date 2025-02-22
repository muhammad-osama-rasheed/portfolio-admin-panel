import React, { useEffect, useState } from "react";
import styles from "./Education.module.css";
import BgButton from "../../../components/BgButton/BgButton";
import CreateEducationModal from "./modals/CreateEducationModal";
import DeleteEducationModal from "./modals/DeleteEducationModal";
import UpdateEducationModal from "./modals/UpdateEducationModal";
import TableLoader from "../../../components/table-loader/TableLoader";

function Education() {
  const [loading, setLoading] = useState(false);

  const [education, setEducation] = useState("");
  const [showCreateEducationModal, setShowCreateEducationModal] =
    useState(false);
  const [showDeleteEducationModal, setShowDeleteEducationModal] =
    useState(false);
  const [showUpdateEducationModal, setShowUpdateEducationModal] =
    useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");

  const getEducation = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_EDUCATION, {
        method: "GET",
      });

      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setEducation(data);
      } else {
        setEducation("");
      }
    } catch (error) {
      console.log("Error fetching Education: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEducation();
  }, []);

  return (
    <div>
      <p className={styles["heading-section"]}>EDUCATION</p>

      {loading ? (
        <TableLoader />
      ) : (
        <>
          <div className="row mb-3 d-flex justify-content-end">
            <div className="col-lg-2 col-md-3 col-sm-4 col-6 ">
              <BgButton
                text={"Add Education"}
                onClick={() => setShowCreateEducationModal(true)}
              />
            </div>
          </div>
          <div className={styles["table-container"]}>
            <table className={styles["table"]}>
              <thead>
                <tr>
                  <th className={styles["table-heading"]}>S.No</th>
                  <th className={styles["table-heading"]}>Title</th>
                  <th className={styles["table-heading"]}>Image</th>
                  <th className={styles["table-heading"]}>Image_Url</th>
                  <th className={styles["table-heading"]}>Institute</th>
                  <th className={styles["table-heading"]}>Degree</th>
                  <th className={styles["table-heading"]}>Grade</th>
                  <th className={styles["table-heading"]}>Start-Date</th>
                  <th className={styles["table-heading"]}>End-Date</th>
                  <th className={styles["table-heading"]}>Ongoing</th>
                  <th className={styles["table-heading"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {education && education.length > 0 ? (
                    education.map((item, index) => (
                      <tr key={index}>
                        <td className={styles["table-value"]}>{index + 1}</td>
                        <td className={styles["table-value"]}>{item.title}</td>

                        <td className={styles["table-value"]}>
                          {item.image !== "" ? (
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "2px",
                                objectFit: "cover",
                              }}
                              src={`data:image/*;base64,${item.image}`}
                              alt=""
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className={styles["table-value"]}>
                          {item.imageUrl !== "" ? (
                            <img
                              style={{
                                width: "25px",
                                height: "25px",
                                borderRadius: "2px",
                                objectFit: "cover",
                              }}
                              src={item.imageUrl}
                              alt="image"
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className={styles["table-value"]}>
                          {item.institute}
                        </td>
                        <td className={styles["table-value"]}>{item.degree}</td>
                        <td className={styles["table-value"]}>{item.grade}</td>
                        <td className={styles["table-value"]}>
                          {item.startDate}
                        </td>
                        <td className={styles["table-value"]}>
                          {item.endDate == "" ? "Present" : item.endDate}
                        </td>
                        <td className={styles["table-value"]}>
                          {item.isOngoing ? "Yes" : "No"}
                        </td>

                        <td className={styles["table-value"]}>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              onClick={() => {
                                setShowUpdateEducationModal(true);
                                setUpdateItem(item);
                              }}
                              style={{
                                width: "16px",
                                height: "16px",
                                marginRight: "10px",
                                cursor: "pointer",
                              }}
                              src="/images/edit.png"
                              alt="icon"
                            />
                            <img
                              onClick={() => {
                                setShowDeleteEducationModal(true);
                                setDeleteItem(item);
                              }}
                              style={{
                                width: "18px",
                                height: "18px",
                                cursor: "pointer",
                              }}
                              src="/images/junk.png"
                              alt="icon"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        style={{ fontSize: "14px" }}
                        colSpan="11"
                        className={`${styles["table-value"]}`}
                      >
                        Record Not Found
                      </td>
                    </tr>
                  )}
                </>
              </tbody>
            </table>
          </div>
        </>
      )}

      <CreateEducationModal
        showCreateEducationModal={showCreateEducationModal}
        setShowCreateEducationModal={setShowCreateEducationModal}
        getEducation={getEducation}
      />

      <DeleteEducationModal
        showDeleteEducationModal={showDeleteEducationModal}
        setShowDeleteEducationModal={setShowDeleteEducationModal}
        item={deleteItem ? deleteItem : ""}
        getEducation={getEducation}
      />

      <UpdateEducationModal
        showUpdateEducationModal={showUpdateEducationModal}
        setShowUpdateEducationModal={setShowUpdateEducationModal}
        item={updateItem ? updateItem : ""}
        getEducation={getEducation}
      />
    </div>
  );
}

export default Education;
