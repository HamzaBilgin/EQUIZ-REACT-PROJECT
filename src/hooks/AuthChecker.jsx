import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserFromDb } from "../actions/crudActions";
import { useNavigate } from "react-router-dom";

export function useAuthChecker() {
  const dispatch = useDispatch();
  const auth = getAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        getUser(user.uid).then((item) => {
          if (item.role === "student") {
            navigate(`/student/${item.uid}`);
          } else if (item.role === "instructor") {
            navigate(`/instructor/${item.uid}`);
          } else if (item.role === "admin") {
            navigate(`/admin/${item.uid}`);
          } else {
            throw new Error("Hata fırlatıldı!");
          }
        });
      } else {
        console.log("olmadı");
      }
    });

    return () => unsubscribe();
  }, [dispatch, auth]);
  const getUser = async (uid) => {
    const user = await getUserFromDb(uid);
    return user;
  };
  return null;
}
