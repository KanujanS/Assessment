import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const Profile = () => {
  const { user, loadUser } = useAuth();

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [msg, setMsg] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");

  const [oldPwd, setOldPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setDob(user.dob ? user.dob.substring(0, 10) : "");
      setPreview(
        user.profilePicture
          ? `http://localhost:4000${user.profilePicture}`
          : null
      );
    }
  }, [user]);

  const updateProfile = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const fd = new FormData();
      fd.append("name", name);
      fd.append("dob", dob);
      if (file) fd.append("profilePicture", file);

      await API.put("/profile/update", fd);
      setMsg("Profile updated successfully");

      await loadUser();
    } catch (err) {
      setMsg("Update failed");
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    setPwdMsg("");

    try {
      await API.put("/profile/change-password", {
        oldPassword: oldPwd,
        newPassword: newPwd,
      });

      setPwdMsg("Password changed successfully");
      setOldPwd("");
      setNewPwd("");
    } catch (err) {
      setPwdMsg("Password change failed");
    }
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 dark:text-white pt-24 p-4">
      {/* Responsive Grid: 1 column mobile, 2 columns on md+ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT CARD — PROFILE UPDATE */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded shadow">
          <h2 className="text-xl mb-4">Edit Profile</h2>

          {msg && (
            <div className="bg-green-200 text-green-900 p-2 mb-3 rounded">
              {msg}
            </div>
          )}

          <form onSubmit={updateProfile} className="space-y-5">
            {/* Clickable profile image */}
            <label className="cursor-pointer flex justify-center">
              {preview ? (
                <img
                  src={preview}
                  className="w-30 h-30 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-full" />
              )}

              {/* Hidden file input */}
              <input type="file" className="hidden" onChange={handleFile} />
            </label>

            <input
              className="w-full p-2 border rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              type="date"
              className="w-full p-2 border rounded-xl"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <input
              disabled
              className="w-full p-2 border rounded-xl bg-gray-100 dark:bg-gray-700"
              value={user?.email || ""}
            />

            <div className="flex justify-end">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT CARD — CHANGE PASSWORD */}
        <div className="bg-gray-100 dark:bg-gray-900 p-6 rounded shadow">
          <h2 className="text-xl mb-4">Change Password</h2>

          {pwdMsg && (
            <div className="bg-yellow-200 text-yellow-900 p-2 mb-3 rounded">
              {pwdMsg}
            </div>
          )}

          <form onSubmit={changePassword} className="space-y-5 md:space-y-10 md:mt-30">
            <input
              type="password"
              placeholder="Old password"
              className="w-full p-2 border rounded-xl"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
            />

            <input
              type="password"
              placeholder="New password"
              className="w-full p-2 border rounded-xl"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />

            <div className="flex justify-end">
              <button className="bg-yellow-600 text-white px-4 py-2 rounded-xl">
              Change Password
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
