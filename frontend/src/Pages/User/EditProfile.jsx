import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link ,useNavigate} from "react-router-dom";

import Layout from "../../Layouts/HomeLayout";
import { getUserData,updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [previewImage, setImagePreview] = useState("");

  const [data, setData] = useState({
    fullname: "",
    avatar: undefined,
    userID: useSelector((state) => state?.auth?.data?._id),
  });

  // function to handle the image upload
  const getImage = (event) => {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    // if image exists then getting the url link of it
    if (uploadedImage) {
      setData({
        ...data,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setImagePreview(this.result);
      });
    }
  };

  // function to set the name of user
  const setName = (event) => {
    const { name, value } = event.target;
    const newUserData = { ...data, [name]: value };
    setData(newUserData);
  };

   // function to handle the form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // checking for the empty field
    if (!data.fullname || !data.avatar) {
      toast.error("All fields are mandatory");
      return;
    }

    // checking the length of name
    if (data.fullname.length < 5) {
      toast.error("Name should have more than 5 characters");
      return;
    }

    // creating the form data from the existing data
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("avatar", data.avatar);

    const newUserData = [data.userID, formData];

    // dispatching the api call using the thunk
    await dispatch(updateProfile(newUserData));
    const response = await dispatch(getUserData());
    
    //fetching the data to update
    // const response = dispatch(getUserData());
    if(response?.payload?.success){
      navigate("/user/profile");
    }
  };
    return (
        <Layout>
          <div className="flex items-center justify-center h-[90vh]">
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col justify-center gap-5 rounded-lg p-2 md:p-4 text-white w-[70%] md:w-80 h-fit md:h-[26rem] my-20 shadow-[0_0_10px_black]"
            >
              <h1 className="text-center text-2xl font-bold">Edit Profile Page</h1>

              {/* input for image file */}
              <label className="cursor-pointer" htmlFor="image_uploads">
                {previewImage ? (
                  <img
                    className=" w-[100px] h-[100px] md:w-28 md:h-28 rounded-full m-auto"
                    src={previewImage}
                    alt="preview image"
                  />
                ) : (
                  <BsPersonCircle className="w-[100px] h-[100px] md:w-28 md:h-28 rounded-full m-auto" />
                )}
              </label>
              <input
                onChange={getImage}
                className="hidden"
                type="file"
                id="image_uploads"
                name="image_uploads"
                accept=".jpg, .jpeg, .png"
              />

              <div className="flex flex-col gap-1">
                <label className="text-lg font-semibold" htmlFor="fullname">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullname"
                  id="fullname"
                  placeholder="Enter your full name"
                  className="bg-transparent px-2 py-1 border"
                  value={data.fullname}
                  onChange={setName}
                />
              </div>

              <Link to={"/user/profile"}>
                <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                  <AiOutlineArrowLeft /> Back to Profile
                </p>
              </Link>

              <button
                className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                type="submit"
              >
                Update Profile
              </button>
            </form>
          </div>
        </Layout>
    )

}
export default EditProfile;