import React, { useEffect, useState } from "react";
import { db } from "../service/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";
import LoginDialog from "@/components/custom/LoginDialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function ProfilePage() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    picture: "",
    bio: "",
  });
  const [initialFormData, setInitialFormData] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);

  // Google login setup
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => getUserProfile(tokenResponse),
    onError: (error) => console.error("Login Failed:", error),
  });

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setLoginDialogOpen(false);
        window.location.reload();
      })
      .catch((err) => console.error("Error fetching user info:", err));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;

      try {
        const ref = doc(db, "users", user.id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          const clonedData = { ...data };
          setFormData(clonedData);
          setInitialFormData(clonedData);
        } else {
          const newProfile = {
            name: user.name || "",
            email: user.email || "",
            picture: user.picture || "",
            bio: "",
          };
          await setDoc(ref, newProfile);
          const clonedNew = { ...newProfile };
          setFormData(clonedNew);
          setInitialFormData(clonedNew);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const ref = doc(db, "users", user.id);
      await setDoc(ref, formData);
      setEditMode(false);
      setInitialFormData({ ...formData });
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleCancel = () => {
    setFormData({ ...initialFormData });
    setEditMode(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="mb-4 text-red-500">User not logged in</p>
        <Button onClick={() => setLoginDialogOpen(true)}>Login</Button>

        <LoginDialog
          open={loginDialogOpen}
          onOpenChange={setLoginDialogOpen}
          onLogin={login}
        />
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <div className="flex items-center gap-4">
        <img
          src={formData.picture || "https://via.placeholder.com/100"}
          alt="Profile"
          className="w-15 h-15 rounded-full border"
        />
        <div className="flex-1">
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-xl font-bold border p-2 rounded w-full text-black"
              placeholder="Your name"
            />
          ) : (
            <h2 className="text-xl font-bold">{formData.name}</h2>
          )}
          <p className="text-sm text-gray-600">{formData.email}</p>
        </div>
      </div>

      <div className="mt-6">
        <label className="block font-medium mb-1">Bio:</label>
        {editMode ? (
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-2 rounded resize-none text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            placeholder="Write something about yourself, your favorite place, hobbies etc..."
          />
        ) : (
          <p className="text-gray-700 whitespace-pre-line">
            {formData.bio || "No bio added yet."}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        {editMode ? (
          <>
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel} className="w-full">
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            onClick={() => setEditMode(true)}
            className="w-full"
          >
            Edit Profile
          </Button>
        )}
        <Button onClick={handleLogout} className="w-full">
          Logout
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
