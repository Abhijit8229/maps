import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { checkAuth, loading, selecteduser } from "../store/authSlice";
import Loading from "../components/ui/Loading";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selecteduser);
  const loadingval = useAppSelector(loading);

  useEffect(() => {
    const userDetails = dispatch(checkAuth());

    return () => {
      userDetails;
    };
  }, [dispatch]);
  console.log(user);
  console.log(loadingval);
  if (loadingval === "loading" || loadingval === "idle") {
    return (
      <div className="w-screen h-screen grid items-center">
        <Loading />
      </div>
    );
  } else {
    if (loadingval === "success") {
      return <div>{children}</div>;
    } else {
      return <div>403</div>;
    }
  }
};

export default PrivateRoute;
