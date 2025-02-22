import React, { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import BgButton from "../../../components/BgButton/BgButton";
import DeleteProjectModal from "./modals/DeleteProjectModal";
import CreateProjectModal from "./modals/CreateProjectModal";
import UpdateProjectModal from "./modals/UpdateProjectModal";
import TableLoader from "../../../components/table-loader/TableLoader";

function Projects() {
  const [loading, setLoading] = useState(true);

  const [project, setProject] = useState("");
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
  const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);
  const [deleteProject, setDeleteProject] = useState("");
  const [updateProject, setUpdateProject] = useState("");

  const getProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_PROJECTS, {
        method: "GET",
      });

      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setProject(data);
      } else {
        setProject("");
      }
    } catch (error) {
      console.log("Error fetching Project: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div>
      <p className={styles["heading-section"]}>PROJECTS</p>

      {loading ? (
        <TableLoader />
      ) : (
        <>
          <div className="row mb-3 d-flex justify-content-end">
            <div className="col-lg-2 col-md-3 col-sm-4 col-6 ">
              <BgButton
                text={"Add Project"}
                onClick={() => setShowCreateProjectModal(true)}
              />
            </div>
          </div>

          <div className={styles["table-container"]}>
            <table className={styles["table"]}>
              <thead>
                <tr>
                  <th className={styles["table-heading"]}>S.No</th>
                  <th className={styles["table-heading"]}>Name</th>
                  <th className={styles["table-heading"]}>Image</th>
                  <th className={styles["table-heading"]}>Image_Url</th>
                  <th className={styles["table-heading"]}>Description</th>
                  <th className={styles["table-heading"]}>Github</th>
                  <th className={styles["table-heading"]}>Demo</th>
                  <th className={styles["table-heading"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {project && project.length > 0 ? (
                    project.map((item, index) => (
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
                              alt=""
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                        <td className={styles["table-value"]}>{item.desc}</td>
                        <td className={styles["table-value"]}>{item.github}</td>
                        <td className={styles["table-value"]}>{item.demo}</td>

                        <td className={styles["table-value"]}>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              onClick={() => {
                                setShowUpdateProjectModal(true);
                                setUpdateProject(item);
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
                                setShowDeleteProjectModal(true);
                                setDeleteProject(item);
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
                        colSpan="10"
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

      <CreateProjectModal
        showCreateProjectModal={showCreateProjectModal}
        setShowCreateProjectModal={setShowCreateProjectModal}
        getProjects={getProjects}
      />

      <UpdateProjectModal
        showUpdateProjectModal={showUpdateProjectModal}
        setShowUpdateProjectModal={setShowUpdateProjectModal}
        item={updateProject ? updateProject : ""}
        getProjects={getProjects}
      />

      <DeleteProjectModal
        showDeleteProjectModal={showDeleteProjectModal}
        setShowDeleteProjectModal={setShowDeleteProjectModal}
        item={deleteProject ? deleteProject : ""}
        getProjects={getProjects}
      />
    </div>
  );
}

export default Projects;
