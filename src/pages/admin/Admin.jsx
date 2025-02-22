import React, { useEffect, useState } from "react";
import styles from "./Admin.module.css";
import DashboardBox from "../../components/dashboardBox/DashboardBox";
import Skills from "./skills/Skills";
import About from "./about/About";
import Education from "./education/Education";
import Projects from "./project/Projects";
import Blogs from "./blog/Blogs";
import Contact from "./contact/Contact";
import ProfileModal from "./profile/ProfileModal";
import Service from "./service/Service";
import Certificate from "./certificate/Certificate";

function Admin() {
  const [active, setActive] = useState("about");

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState("");

  const data = [
    {
      id: 1,
      title: "about",
      icon: "/images/about.png",
    },
    {
      id: 2,
      title: "skills",
      icon: "/images/skills.png",
    },
    {
      id: 3,
      title: "education",
      icon: "/images/education.png",
    },
    {
      id: 4,
      title: "projects",
      icon: "/images/projects.png",
    },
    {
      id: 5,
      title: "blogs",
      icon: "/images/blogs.png",
    },
    {
      id: 6,
      title: "contact",
      icon: "/images/phone.png",
    },
    {
      id: 7,
      title: "service",
      icon: "/images/service.png",
    },
    {
      id: 8,
      title: "certificate",
      icon: "/images/certificate.png",
    },
  ];

  const getProfile = async () => {
    try {
      const response = await fetch("https://osamaapi.vercel.app/profile", {
        method: "GET",
      });
      const result = await response.json();
      const { success, data } = result;

      if (success) {
        setProfile(data[0]);
      } else {
        setProfile("");
      }
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className={styles["admin-heading-container"]}>
            <h4 style={{ fontSize: "18px", margin: "0px" }}>Admin Dashboard</h4>
          </div>

          <div className={styles["admin-info-container"]}>
            <div className={styles["profile-container"]}>
              <img
                className="img-fluid"
                src={
                  profile && profile !== ""
                    ? `data:image/*;base64,${profile.image}`
                    : "/images/mypic.jpg"
                }
                alt="osama"
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "contain",
                  borderRadius: "50%",
                }}
              />
              <div
                onClick={() => setShowProfileModal(true)}
                className={styles["plus-icon"]}
              >
                <img
                  style={{ width: "12px", height: "12px" }}
                  src="/images/upload.png"
                  alt="icon"
                />
              </div>
            </div>

            <div className="text-center">
              <p
                style={{ letterSpacing: "5px" }}
                className={`mb-0 mt-3  ${styles["text"]}`}
              >
                <span style={{ color: "#2C98F0", fontWeight: "500" }}>
                  ADMIN
                </span>
              </p>
              <p className={`mb-0 ${styles["text"]}`}>
                Name:{" "}
                <span style={{ color: "#2C98F0" }}>
                  {localStorage.getItem("adminName") || "Muhammad Osama"}
                </span>
              </p>
              <p className={`mb-0 ${styles["text"]}`}>
                Email:{" "}
                <span style={{ color: "#2C98F0" }}>
                  {localStorage.getItem("adminEmail")}
                </span>
              </p>
            </div>
          </div>

          <p className={styles["heading-section"]}>Manage Sections</p>
          <div className={`row my-4 ${styles["box-row"]}`}>
            {data.map((item, index) => (
              <div key={index} className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className={styles["inner-box-row"]}>
                  <DashboardBox
                    active={active}
                    setActive={setActive}
                    title={item.title}
                    icon={item.icon}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="row">
            <div className="col-12">
              {active == "about" && <About />}
              {active == "skills" && <Skills />}
              {active == "education" && <Education />}
              {active == "projects" && <Projects />}
              {active == "blogs" && <Blogs />}
              {active == "contact" && <Contact />}
              {active == "service" && <Service />}
              {active == "certificate" && <Certificate />}
            </div>
          </div>
        </div>
      </div>

      <ProfileModal
        showProfileModal={showProfileModal}
        setShowProfileModal={setShowProfileModal}
        profile={profile ? profile.image : ""}
        profileId={profile ? profile._id : ""}
        getProfile={getProfile}
      />
    </div>
  );
}

export default Admin;
