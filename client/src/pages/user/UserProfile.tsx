import { Button } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useAuth } from "../../hooks/useAuth";

const UserProfile: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();
  if (loading) return <p>Loading</p>;

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
    toast.success("Logout successful");
  };

  return (
    <>
      <div className="p-4">
        UserProfile {params.username} {user?.email}
        <Button onClick={() => handleLogout()} className="m-3" color="black">
          Logout
        </Button>
      </div>
    </>
  );
};

export default UserProfile;
