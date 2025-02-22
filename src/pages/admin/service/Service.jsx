import React, { useEffect, useState } from "react";
import styles from "./Service.module.css";
import CreateServiceModal from "./modals/CreateServiceModal";
import BgButton from "../../../components/BgButton/BgButton";
import DeleteServiceModal from "./modals/DeleteServiceModal";
import UpdateServiceModal from "./modals/UpdateServiceModal";
import TableLoader from "../../../components/table-loader/TableLoader";

function Service() {
  const [loading, setLoading] = useState(false);
  const [showCreateServiceModal, setShowCreateServiceModal] = useState(false);
  const [showDeleteServiceModal, setShowDeleteServiceModal] = useState(false);
  const [showUpdateServiceModal, setShowUpdateServiceModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [updateItem, setUpdateItem] = useState("");

  const [service, setService] = useState("");

  const getService = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_SERVICES, {
        method: "GET",
      });

      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setService(data);
      } else {
        setService("");
      }
    } catch (error) {
      console.log("Error fetching services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getService();
  }, []);

  return (
    <div>
      <p className={styles["heading-section"]}>MY SERVICES</p>

      {loading ? (
        <TableLoader />
      ) : (
        <>
          <div className="row mb-3 d-flex justify-content-end">
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <BgButton
                text={"Add Service"}
                onClick={() => setShowCreateServiceModal(true)}
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
                  <th className={styles["table-heading"]}>Description</th>
                  <th className={styles["table-heading"]}>Color</th>
                  <th className={styles["table-heading"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {service && service.length > 0 ? (
                    service.map((item, index) => (
                      <tr key={index}>
                        <td className={styles["table-value"]}>{index + 1}</td>
                        <td className={styles["table-value"]}>{item.title}</td>
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
                        <td className={styles["table-value"]}>
                          📌 {item.desc}
                        </td>
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
                                setShowUpdateServiceModal(true);
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
                                setShowDeleteServiceModal(true);
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
                        colSpan="6"
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

      <CreateServiceModal
        showCreateServiceModal={showCreateServiceModal}
        setShowCreateServiceModal={setShowCreateServiceModal}
        getService={getService}
      />

      <DeleteServiceModal
        showDeleteServiceModal={showDeleteServiceModal}
        setShowDeleteServiceModal={setShowDeleteServiceModal}
        item={deleteItem ? deleteItem : ""}
        getService={getService}
      />

      <UpdateServiceModal
        showUpdateServiceModal={showUpdateServiceModal}
        setShowUpdateServiceModal={setShowUpdateServiceModal}
        item={updateItem ? updateItem : ""}
        getService={getService}
      />
    </div>
  );
}

export default Service;
