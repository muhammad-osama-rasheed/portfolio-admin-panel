import React, { useEffect, useState } from "react";
import BgButton from "../../../components/BgButton/BgButton";
import styles from "./certificate.module.css";
import CreateCertificateModal from "./modals/CreateCertificateModal";
import UpdateCertificateModal from "./modals/UpdateCertificateModal";
import DeleteCertificateModal from "./modals/DeleteCertificateModal";
import TableLoader from "../../../components/table-loader/TableLoader";

function Certificate() {
  const [loading, setLoading] = useState(false);

  const [showCreateCertificateModal, setShowCreateCertificateModal] =
    useState(false);
  const [showDeleteCertificateModal, setShowDeleteCertificateModal] =
    useState(false);
  const [showUpdateCertificateModal, setShowUpdateCertificateModal] =
    useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");

  const [certificate, setCertificate] = useState("");

  const getCertificate = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_CERTIFICATE, {
        method: "GET",
      });

      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setCertificate(data);
      } else {
        setCertificate("");
      }
    } catch (error) {
      console.log("Error fetching certificates", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCertificate();
  }, []);

  return (
    <div>
      <p className={styles["heading-section"]}>MY certificateS</p>

      {loading ? (
        <TableLoader />
      ) : (
        <>
          <div className="row mb-3 d-flex justify-content-end">
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <BgButton
                text={"Add certificate"}
                onClick={() => setShowCreateCertificateModal(true)}
              />
            </div>
          </div>
          <div className={styles["table-container"]}>
            <table className={styles["table"]}>
              <thead>
                <tr>
                  <th className={styles["table-heading"]}>S.No</th>
                  <th className={styles["table-heading"]}>Title</th>
                  <th className={styles["table-heading"]}>Company</th>
                  <th className={styles["table-heading"]}>Image</th>
                  <th className={styles["table-heading"]}>Image_Url</th>
                  <th className={styles["table-heading"]}>Certificate</th>
                  <th className={styles["table-heading"]}>Issue_Date</th>
                  <th className={styles["table-heading"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {certificate && certificate.length > 0 ? (
                    certificate.map((item, index) => (
                      <tr key={index}>
                        <td className={styles["table-value"]}>{index + 1}</td>
                        <td className={styles["table-value"]}>{item.title}</td>
                        <td className={styles["table-value"]}>
                          {item.company}
                        </td>

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

                        <td className={styles["table-value"]}>{item.url}</td>
                        <td className={styles["table-value"]}>
                          {item.issue_date}
                        </td>
                        <td className={styles["table-value"]}>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              onClick={() => {
                                setShowUpdateCertificateModal(true);
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
                                setShowDeleteCertificateModal(true);
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
                        colSpan="8"
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

      <CreateCertificateModal
        showCreateCertificateModal={showCreateCertificateModal}
        setShowCreateCertificateModal={setShowCreateCertificateModal}
        getCertificate={getCertificate}
      />

      <UpdateCertificateModal
        showUpdateCertificateModal={showUpdateCertificateModal}
        setShowUpdateCertificateModal={setShowUpdateCertificateModal}
        item={updateItem ? updateItem : ""}
        getCertificate={getCertificate}
      />

      <DeleteCertificateModal
        showDeleteCertificateModal={showDeleteCertificateModal}
        setShowDeleteCertificateModal={setShowDeleteCertificateModal}
        item={deleteItem ? deleteItem : ""}
        getCertificate={getCertificate}
      />
    </div>
  );
}

export default Certificate;
