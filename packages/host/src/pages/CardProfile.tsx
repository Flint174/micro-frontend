import { Suspense, lazy } from "react";
import { useParams } from "react-router";

const Cards = lazy(() => import("@cards/Cards"));

function CardProfile() {
  const { id } = useParams();

  return (
    <Suspense fallback="Loading...">
      <Cards id={id ?? ""} />
    </Suspense>
  );
}

export default CardProfile;
