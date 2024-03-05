import { User } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";

export const useUserData = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/users/me");
        setUser(res.data.data.user);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    if (!user) fetchUser();
  }, [user]);

  return { user, loading };
};
