import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import BgButton from "../../../components/BgButton/BgButton";
import TableLoader from "../../../components/table-loader/TableLoader";
import CreateAboutCardModal from "./modals/CreateAboutCardModal";
import DeleteAbouCardModal from "./modals/DeleteAbouCardModal";
import UpdateAboutCardModal from "./modals/UpdateAboutCardModal";

function About() {
  const [loading, setLoading] = useState(false);
  const [showCreateAboutCardModal, setShowCreateAboutCardModal] =
    useState(false);
  const [showDeleteAboutCardModal, setShowDeleteAboutCardModal] =
    useState(false);
  const [showUpdateAboutCardModal, setShowUpdateAboutCardModal] =
    useState(false);
  const [deleteAboutCard, setDeleteAboutCard] = useState("");
  const [updateAboutCard, setUpdateAboutCard] = useState("");

  const [aboutCard, setAboutCard] = useState("");

  const getAboutCards = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_ABOUT, {
        method: "GET",
      });

      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setAboutCard(data);
      } else {
        setAboutCard("");
      }
    } catch (error) {
      console.log("Error fetching Card: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAboutCards();
  }, []);

  return (
    <div>
      <p className={styles["heading-section"]}>ABOUT</p>

      {loading ? (
        <TableLoader />
      ) : (
        <>
          <div className="row mb-3 d-flex justify-content-end">
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <BgButton
                text={"Add Card"}
                onClick={() => setShowCreateAboutCardModal(true)}
              />
            </div>
          </div>

          <div className={styles["table-container"]}>
            <table className={styles["table"]}>
              <thead>
                <tr>
                  <th className={styles["table-heading"]}>S.No</th>
                  <th className={styles["table-heading"]}>Image</th>
                  <th className={styles["table-heading"]}>Title</th>
                  <th className={styles["table-heading"]}>Color</th>
                  <th className={styles["table-heading"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {aboutCard && aboutCard.length > 0 ? (
                    aboutCard.map((item, index) => (
                      <tr key={index}>
                        <td className={styles["table-value"]}>{index + 1}</td>

                        <td className={styles["table-value"]}>
                          <img
                            style={{
                              width: "30px",
                              height: "30px",
                              background: `${item.color}`,
                              padding: "4px",
                              borderRadius: "2px",
                            }}
                            src={`data:image/*;base64,${item.image}`}
                            alt=""
                          />
                        </td>
                        <td className={styles["table-value"]}>{item.title}</td>
                        <td className={styles["table-value"]}>
                          <span
                            style={{
                              background: `${item.color}`,
                              padding: "4px",
                              borderRadius: "2px",
                              color: "#fff",
                            }}
                          >
                            {item.color}
                          </span>
                        </td>

                        <td className={styles["table-value"]}>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              onClick={() => {
                                setShowUpdateAboutCardModal(true);
                                setUpdateAboutCard(item);
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
                                setShowDeleteAboutCardModal(true);
                                setDeleteAboutCard(item);
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
                        colSpan="5"
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

      <CreateAboutCardModal
        showCreateAboutCardModal={showCreateAboutCardModal}
        setShowCreateAboutCardModal={setShowCreateAboutCardModal}
        getAboutCards={getAboutCards}
      />

      <UpdateAboutCardModal
        showUpdateAboutCardModal={showUpdateAboutCardModal}
        setShowUpdateAboutCardModal={setShowUpdateAboutCardModal}
        item={updateAboutCard ? updateAboutCard : ""}
        getAboutCards={getAboutCards}
      />

      <DeleteAbouCardModal
        showDeleteAboutCardModal={showDeleteAboutCardModal}
        setShowDeleteAboutCardModal={setShowDeleteAboutCardModal}
        item={deleteAboutCard ? deleteAboutCard : ""}
        getAboutCards={getAboutCards}
      />
    </div>
  );
}

export default About;
