import { usePostSignoutMutation } from "globalStore/dashboardApi.js";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const [postSignout, { isLoading, isError, error, isSuccess }] =
    usePostSignoutMutation();

  const navigate = useNavigate();
  postSignout()
    .unwrap()
    .then((response) => {
      console.log("RESP1:", response);
      navigate("/signin");
    })
    .then((error) => {
      console.log(error);
    });

  useEffect(() => {
    // if (isSuccess) {
    //   // toast.success('You successfully logged in');
    // }
    if (isError) {
      // toast.error((error as any).data.message, {
      //   position: 'top-right',
      // });
      console.log(error.data.message);
    }
  }, [isLoading]);

  return <div>Signout</div>;
};

export default Signout;
