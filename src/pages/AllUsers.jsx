import React, { useEffect, useState } from "react";
import { db } from "../service/firebaseConfig";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { Button } from "../components/ui/button";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const userList = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUser.id);
      setUsers(userList);

      // Fetch sent requests
      const requestsSnapshot = await getDocs(collection(db, "friendRequests"));
      const requests = requestsSnapshot.docs
        .map((doc) => doc.data())
        .filter(
          (req) => req.from === currentUser.sub && req.status === "pending"
        )
        .map((req) => req.to);

      setSentRequests(requests);
    };

    fetchUsers();
  }, [currentUser.sub]);

  const sendFriendRequest = async (toUserId) => {
    const requestId = `${currentUser.sub}_${toUserId}`;
    await setDoc(doc(db, "friendRequests", requestId), {
      from: currentUser.sub,
      to: toUserId,
      status: "pending",
      timestamp: new Date(),
    });
    setSentRequests((prev) => [...prev, toUserId]);
  };

  const handleInvite = async () => {
    if (!inviteEmail) return;

    try {
      // Save invite to Firestore (optional logic)
      await setDoc(doc(db, "invites", inviteEmail), {
        invitedBy: currentUser.sub,
        email: inviteEmail,
        timestamp: new Date(),
      });

      alert(`Invite sent to ${inviteEmail}`);
      setInviteEmail("");
    } catch (error) {
      console.error("Error sending invite:", error);
      alert("Failed to send invite. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      <h2 className="text-3xl font-bold text-center">Connect With People</h2>

      {/* Invite User Section */}
      <div className="border rounded-lg p-4 shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Invite a User</h3>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter email to invite"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="border px-4 py-2 rounded-md w-full"
          />
          <Button onClick={handleInvite}>Invite</Button>
        </div>
      </div>

      {/* List All Users */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">All Registered Users</h3>
        {users.length === 0 ? (
          <p className="text-gray-500">No other users found.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border p-4 rounded-lg flex justify-between items-center shadow-sm"
            >
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => sendFriendRequest(user.id)}
                  disabled={sentRequests.includes(user.id)}
                >
                  {sentRequests.includes(user.id)
                    ? "Request Sent"
                    : "Add Friend"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => alert(`Invite link sent to ${user.email}`)}
                >
                  Invite
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllUsers;
