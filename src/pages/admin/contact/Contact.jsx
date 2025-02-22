import React, { useEffect, useState } from "react";
import styles from "./Contact.module.css";
import DeleteModal from "./DeleteModal";
import TableLoader from "../../../components/table-loader/TableLoader";

function Contact() {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const getContact = async () => {
    try {
      setLoading(true);

      const response = await fetch(import.meta.env.VITE_API_URL_CONTACT, {
        method: "GET",
      });

      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setContact(data);
      } else {
        setContact("");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  return (
    <div>
      <p className={styles["heading-section"]}>CONTACT</p>

      {loading ? (
        <TableLoader />
      ) : (
        <div className={styles["table-container"]}>
          <table className={styles["table"]}>
            <thead>
              <tr>
                <th className={styles["table-heading"]}>S.No</th>
                <th className={styles["table-heading"]}>Name</th>
                <th className={styles["table-heading"]}>Email</th>
                <th className={styles["table-heading"]}>Subject</th>
                <th className={styles["table-heading"]}>Message</th>
                <th className={styles["table-heading"]}>Actions</th>
              </tr>
            </thead>
            <tbody>
              <>
                {contact && contact.length > 0 ? (
                  contact.map((item, index) => (
                    <tr key={index}>
                      <td className={styles["table-value"]}>{index + 1}</td>
                      <td className={styles["table-value"]}>{item.name}</td>
                      <td className={styles["table-value"]}> {item.email}</td>
                      <td className={styles["table-value"]}>{item.subject}</td>
                      <td className={styles["table-value"]}> {item.message}</td>

                      <td className={styles["table-value"]}>
                        <div className="d-flex justify-content-center align-items-center">
                          <img
                            onClick={() => {
                              setShowDeleteModal(true);
                              setItem(item);
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
      )}

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        item={item ? item : ""}
        getContact={getContact}
      />
    </div>
  );
}

export default Contact;
