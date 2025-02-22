import React, { useEffect, useState } from "react";
import styles from "./Blogs.module.css";
import BgButton from "../../../components/BgButton/BgButton";
import ContentModal from "./modals/ContentModal";
import DeleteBlogModal from "./modals/DeleteBlogModal";
import CreateBlogModal from "./modals/CreateBlogModal";
import UpdateBlogModal from "./modals/UpdateBlogModal";
import TableLoader from "../../../components/table-loader/TableLoader";

function Blogs() {
  const [loading, setLoading] = useState(false);

  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false);
  const [showDeleteBlogModal, setShowDeleteBlogModal] = useState(false);
  const [showUpdateBlogModal, setShowUpdateBlogModal] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState("");
  const [updateBlog, setUpdateBlog] = useState("");
  const [showContentModal, setShowContentModal] = useState(false);
  const [item, setitem] = useState("");

  const [blog, setBlog] = useState("");

  const getBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL_BLOG, {
        method: "GET",
      });

      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setBlog(data);
      } else {
        setBlog("");
      }
    } catch (error) {
      console.log("Error fetching blogs: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <p className={styles["heading-section"]}>BLOGS</p>

      {loading ? (
        <TableLoader />
      ) : (
        <>
          <div className="row mb-3 d-flex justify-content-end">
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
              <BgButton
                text={"Add Blog"}
                onClick={() => setShowCreateBlogModal(true)}
              />
            </div>
          </div>
          <div className={styles["table-container"]}>
            <table className={styles["table"]}>
              <thead>
                <tr>
                  <th className={styles["table-heading"]}>S.No</th>
                  <th className={styles["table-heading"]}>Title</th>
                  <th className={styles["table-heading"]}>content</th>
                  <th className={styles["table-heading"]}>is_Published</th>
                  <th className={styles["table-heading"]}>Actions</th>
                </tr>
              </thead>
              <tbody>
                <>
                  {blog && blog.length > 0 ? (
                    blog.map((item, index) => (
                      <tr key={index}>
                        <td className={styles["table-value"]}>{index + 1}</td>
                        <td className={styles["table-value"]}>
                          🏷️ {item.title}
                        </td>
                        <td className={styles["table-value"]}>
                          <span>📝 </span>
                          {item.content.length > 50
                            ? item.content.substring(0, 25) + "..."
                            : item.content}
                          <span
                            onClick={() => {
                              setShowContentModal(true);
                              setitem(item);
                            }}
                            style={{
                              cursor: "pointer",
                              color: "#2C98F0",
                              marginLeft: "5px",
                              fontWeight: "500",
                            }}
                          >
                            read more
                          </span>
                        </td>
                        <td className={styles["table-value"]}>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              style={{
                                width: "15px",
                                height: "15px",
                                marginRight: "5px",
                              }}
                              src={
                                item.isPublished
                                  ? "/images/check.png"
                                  : "/images/not.png"
                              }
                              alt=""
                            />
                            {item.isPublished ? "published" : "not published"}
                          </div>
                        </td>

                        <td className={styles["table-value"]}>
                          <div className="d-flex justify-content-center align-items-center">
                            <img
                              onClick={() => {
                                setShowUpdateBlogModal(true);
                                setUpdateBlog(item);
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
                                setShowDeleteBlogModal(true);
                                setDeleteBlog(item);
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
                        colSpan="7"
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

      <ContentModal
        showContentModal={showContentModal}
        setShowContentModal={setShowContentModal}
        item={item ? item : ""}
      />

      <CreateBlogModal
        showCreateBlogModal={showCreateBlogModal}
        setShowCreateBlogModal={setShowCreateBlogModal}
        getBlogs={getBlogs}
      />

      <UpdateBlogModal
        showUpdateBlogModal={showUpdateBlogModal}
        setShowUpdateBlogModal={setShowUpdateBlogModal}
        item={updateBlog ? updateBlog : ""}
        getBlogs={getBlogs}
      />

      <DeleteBlogModal
        showDeleteBlogModal={showDeleteBlogModal}
        setShowDeleteBlogModal={setShowDeleteBlogModal}
        item={deleteBlog ? deleteBlog : ""}
        getBlogs={getBlogs}
      />
    </div>
  );
}

export default Blogs;
