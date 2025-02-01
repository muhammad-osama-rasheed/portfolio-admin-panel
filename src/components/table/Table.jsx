import React from "react";
import style from "./Table.module.css";

function Table({
  data,
  title,
  setSkillItem,
  setShowUpdateSkillModal,
  setSkillData,
  setShowDeleteSkillModal,
}) {
  return (
    <>
      <p className={style["heading-section"]}>{title}</p>

      <div className={style["table-container"]}>
        <table className={style["table"]}>
          <thead>
            <tr>
              <th className={style["table-heading"]}>S.No</th>
              <th className={style["table-heading"]}>Name</th>
              <th className={style["table-heading"]}>icon</th>
              <th className={style["table-heading"]}>Category</th>
              <th className={style["table-heading"]}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.map((item, index) => (
                  <tr key={index}>
                    <td className={style["table-value"]}>{index + 1}</td>
                    <td className={style["table-value"]}>{item.name}</td>
                    <td className={style["table-value"]}>
                      <img
                        src={`data:image/png;base64,${item.image}`}
                        alt={item.name}
                        style={{ width: "20px", height: "20px" }}
                      />
                    </td>
                    <td className={style["table-value"]}>{item.category}</td>
                    <td className={style["table-value"]}>
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          onClick={() => {
                            setShowUpdateSkillModal(true);
                            setSkillItem(item);
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
                            setShowDeleteSkillModal(true);
                            setSkillData(item);
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
  );
}

export default Table;
