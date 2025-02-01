import React, { act, useEffect, useState } from "react";
import styles from "./Skills.module.css";
import style from "./../Common.module.css";
import BgButton from "../../../components/BgButton/BgButton";
import UpdateModal from "./update/UpdateModal";
import DeleteModal from "./delete/DeleteModal";
import AddProgressModal from "./addProgress/AddProgressModal";
import Table from "../../../components/table/Table";
import AddSkillModal from "./addProgress/AddSkillModal";
import UpdateSkillModal from "./update/UpdateSkillModal";
import DeleteSkillModal from "./delete/DeleteSkillModal";

function Skills({ progress, getProgress }) {
  const [active, setActive] = useState("progress");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [progressItem, setProgressItem] = useState("");
  const [id, setId] = useState("");
  const [skillItem, setSkillItem] = useState("");
  const [showUpdateSkillModal, setShowUpdateSkillModal] = useState(false);
  const [showDeleteSkillModal, setShowDeleteSkillModal] = useState(false);
  const [skillData, setSkillData] = useState("");

  const [frontend, setFrontend] = useState("");
  const [backend, setBackend] = useState("");
  const [database, setDatabase] = useState("");
  const [language, setLanguage] = useState("");
  const [others, setOthers] = useState("");

  const getskills = async () => {
    try {
      const response = await fetch("https://osamaapi.vercel.app/skills", {
        method: "GET",
      });

      const data = await response.json();

      if (data && data.length > 0) {
        const filterFrontend = data.filter(
          (item) => item.category === "frontend"
        );
        if (filterFrontend) {
          setFrontend(filterFrontend);
          // console.log("Frontend", filterFrontend);
        }

        const filterBackend = data.filter(
          (item) => item.category === "backend"
        );
        if (filterBackend) {
          setBackend(filterBackend);
          // console.log("Backend", filterBackend);
        }

        const filterDatabase = data.filter(
          (item) => item.category === "database"
        );
        if (filterDatabase) {
          setDatabase(filterDatabase);
          // console.log("Database", filterDatabase);
        }

        const filterLanguage = data.filter(
          (item) => item.category === "language"
        );
        if (filterLanguage) {
          setLanguage(filterLanguage);
          // console.log("Language", filterLanguage);
        }

        const filterOthers = data.filter((item) => item.category === "other");
        if (filterOthers) {
          setOthers(filterOthers);
          // console.log("Others", filterOthers);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getskills();
  }, []);
  // console.log("Frontenddd", frontend);

  return (
    <>
      <p className={style["heading-section"]}>Skills</p>

      <div className="row my-4">
        <div className="col-6">
          <div
            style={{
              border: active == "progress" && "1.5px solid #2C98F0",
              backgroundColor: active == "progress" && "#EFF6FF",
            }}
            onClick={() => setActive("progress")}
            className={styles["button"]}
          >
            progress bar
          </div>
        </div>
        <div className="col-6">
          <div
            style={{
              border: active == "skills" && "1.5px solid #2C98F0",
              backgroundColor: active == "skills" && "#EFF6FF",
            }}
            onClick={() => setActive("skills")}
            className={styles["button"]}
          >
            manage skills
          </div>
        </div>
      </div>

      {active == "progress" && (
        <>
          <div className="row mb-2 d-flex justify-content-end align-items-center">
            <div className="col-lg-3 col-sm-5 col-6">
              <BgButton
                onClick={() => setShowAddModal(true)}
                text={"Add Progress Bar"}
              />
            </div>
          </div>

          <div className={style["table-container"]}>
            <table className={style["table"]}>
              <thead>
                <tr>
                  <th className={style["table-heading"]}>S.No</th>
                  <th className={style["table-heading"]}>Title</th>
                  <th className={style["table-heading"]}>%</th>
                  <th className={style["table-heading"]}>Color</th>
                  <th className={style["table-heading"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {progress
                  ? progress.map((item, index) => (
                      <tr key={index}>
                        <td className={style["table-value"]}>{index + 1}</td>
                        <td className={style["table-value"]}>{item.title}</td>
                        <td className={style["table-value"]}>
                          {item.percentage}
                        </td>
                        <td className={style["table-value"]}>{item.color}</td>
                        <td className={style["table-value"]}>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              onClick={() => {
                                setShowUpdateModal(true);
                                setProgressItem(item);
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
                                setShowDeleteModal(true);
                                setId(item._id);
                              }}
                              style={{
                                width: "18px",
                                height: "18px",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                              src="/images/junk.png"
                              alt="icon"
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          </div>
        </>
      )}

      {active == "skills" && (
        <>
          <div className="row mb-4 d-flex justify-content-end align-items-center">
            <div className="col-lg-3 col-sm-5 col-6">
              <BgButton
                onClick={() => setShowAddSkillModal(true)}
                text={"Add your New Skill"}
              />
            </div>
          </div>

          <div>
            {language !== "" && language.length > 0 && (
              <Table
                data={language}
                title={"Programming Languages"}
                setSkillItem={setSkillItem}
                setShowUpdateSkillModal={setShowUpdateSkillModal}
                setSkillData={setSkillData}
                setShowDeleteSkillModal={setShowDeleteSkillModal}
              />
            )}
            {frontend !== "" && frontend.length > 0 && (
              <Table
                data={frontend}
                title={"Frontend Development"}
                setSkillItem={setSkillItem}
                setShowUpdateSkillModal={setShowUpdateSkillModal}
                setSkillData={setSkillData}
                setShowDeleteSkillModal={setShowDeleteSkillModal}
              />
            )}
            {backend !== "" && backend.length > 0 && (
              <Table
                data={backend}
                title={"Backend Development"}
                setSkillItem={setSkillItem}
                setShowUpdateSkillModal={setShowUpdateSkillModal}
                setSkillData={setSkillData}
                setShowDeleteSkillModal={setShowDeleteSkillModal}
              />
            )}
            {database !== "" && database.length > 0 && (
              <Table
                data={database}
                title={"Databases & design"}
                setSkillItem={setSkillItem}
                setShowUpdateSkillModal={setShowUpdateSkillModal}
                setSkillData={setSkillData}
                setShowDeleteSkillModal={setShowDeleteSkillModal}
              />
            )}

            {others !== "" && others.length > 0 && (
              <Table
                data={others}
                title={"Other Additional Skills"}
                setSkillItem={setSkillItem}
                setShowUpdateSkillModal={setShowUpdateSkillModal}
                setSkillData={setSkillData}
                setShowDeleteSkillModal={setShowDeleteSkillModal}
              />
            )}
          </div>
        </>
      )}

      <AddProgressModal
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        getProgress={getProgress}
      />

      <UpdateModal
        getProgress={getProgress}
        item={progressItem ? progressItem : ""}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
      />

      <DeleteModal
        id={id ? id : ""}
        getProgress={getProgress}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
      />

      <AddSkillModal
        showAddSkillModal={showAddSkillModal}
        setShowAddSkillModal={setShowAddSkillModal}
        getskills={getskills}
      />
      <UpdateSkillModal
        showUpdateSkillModal={showUpdateSkillModal}
        setShowUpdateSkillModal={setShowUpdateSkillModal}
        item={skillItem ? skillItem : ""}
        getskills={getskills}
      />

      <DeleteSkillModal
        showDeleteSkillModal={showDeleteSkillModal}
        setShowDeleteSkillModal={setShowDeleteSkillModal}
        item={skillData ? skillData : ""}
        getskills={getskills}
      />
    </>
  );
}

export default Skills;
