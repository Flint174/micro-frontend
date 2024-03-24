import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

function useChannels() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const bc = new BroadcastChannel("route");

    bc.onmessage = ({ data }) => {
      if (!data?.to) return;

      if (data.relevant) {
        navigate(`${location.pathname}/${data.to}`);
        return;
      }

      navigate(data.to);
    };
    return () => {
      bc.close();
    };
  }, [location.pathname, navigate]);
}

export default useChannels;
