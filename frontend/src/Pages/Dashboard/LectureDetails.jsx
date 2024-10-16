import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import Layout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLecture,
} from "../../Redux/Slices/LectureSlice";

const DisplayLectures = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // for getting the data from location of previous component
  const courseDetails = useLocation().state;
  const { lectures } = useSelector((state) => state.lectures);
  const { role } = useSelector((state) => state.auth);

  // to play the video accordingly
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // function to handle lecture delete
  const handleLectureDelete = async (courseId, lectureId) => {
    const data = { courseId, lectureId };
    await dispatch(deleteCourseLecture(data));
    await dispatch(getCourseLecture(courseDetails._id));
  };

  // fetching the course lecture data
  useEffect(() => {
    if (!courseDetails) {
      navigate(-1);
    }
    (async () => {
      await dispatch(getCourseLecture(courseDetails._id));
    })();
  }, []);
  return (
    <Layout>
      <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
        {/* displaying the course name */}

        <h1 className="text-center text-2xl font-semibold text-yellow-500">
          Course Name : {courseDetails?.title}
        </h1>

        {((lectures) && (lectures.length>0))?<div className="flex flex-col md:flex-row justify-center gap-5 md:gap-10 w-full">
          {/* left section for playing the video and displaying course details to admin */}
          <div className="space-y-5 w-full md:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
            <video
              className="object-fill rounded-tl-lg rounded-tr-lg w-full"
              src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
              controls
              disablePictureInPicture
              muted
              controlsList="nodownload"
            ></video>
            <div>
              <h1>
                <span className="text-yellow-500">Title : </span>
                {lectures && lectures[currentVideoIndex]?.title}
              </h1>
              <p>
                {" "}
                <span className="text-yellow-500 line-clamp-4">
                  Description :{" "}
                </span>
                {lectures && lectures[currentVideoIndex]?.description}
              </p>
            </div>
          </div>

          {/* right section for displaying all the lectures of the course */}
          <ul className="w-full md:w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
            <li className="font-semibold text-md md:text-xl text-yellow-500 flex items-center justify-between">
              <p>Lectures List</p>
              {role === "ADMIN" && (
                <button
                  onClick={() =>
                    navigate("/course/addlecture", {
                      state: { ...courseDetails },
                    })
                  }
                  className="bg-blue-400 w-fit px-1 md:px-2 py-1 rounded-md md:font-semibold text-[14px] md:text-sm"
                >
                  Add New Lecture
                </button>
              )}
            </li>
            {lectures &&
              lectures.map((element, index) => {
                return (
                  <li className="space-y-2" key={element._id}>
                    <p
                      className="cursor-pointer"
                      onClick={() => setCurrentVideoIndex(index)}
                    >
                      <span className="text-yellow-500">
                        {" "}
                        Lecture {index + 1} :{" "}
                      </span>
                      {element?.title}
                    </p>
                    {role === "ADMIN" && (
                      <button
                        onClick={() =>
                          handleLectureDelete(courseDetails?._id, element?._id)
                        }
                        className="bg-red-400 w-fit px-1 md:px-2 py-1 rounded-md md:font-semibold text-[14px] md:text-sm"
                      >
                        Delete Lecture
                      </button>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>:(role ==="ADMIN")?
        <button
              onClick={() =>
                navigate("/course/addlecture", {
                  state: { ...courseDetails },
                })
              }
              className="bg-blue-400 px-2 py-1 rounded-md font-semibold text-sm"
            >
              Add New Lecture
        </button>
        :<h3 className = "text-lg text-red-400">There is no lecture yet!!!</h3>}
      </div>
    </Layout>
  );
};

export default DisplayLectures;
