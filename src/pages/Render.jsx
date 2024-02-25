import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import TestimonialRenderer from "../components/TestimonialRenderer";
import {
  fetchApplications,
  selectApplicationById,
  selectApplicationStatus,
} from "../feature/application/applicationSlice";
import { useParams } from "react-router-dom";
import ProttoionRenderer from "../components/ProttoionRenderer";

const Render = () => {
  const { id, type } = useParams();
  const application = useSelector(selectApplicationById(id))[0];
  const status = useSelector(selectApplicationStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") dispatch(fetchApplications());
  }, [id, status, dispatch]);

  if (
    application &&
    (application.applicationType === "testimonial" ||
      application.applicationType === "certificate-testimonial")
  ) {
    return (
      <TestimonialRenderer application={application} id={id} type={type} />
    );
  } else if (
    application &&
    (application.applicationType === "psps" ||
      application.applicationType === "pscs" ||
      application.applicationType === "psis")
  ) {
    return <ProttoionRenderer application={application} id={id} type={type} />;
  } else {
    // console.log(application);
    return <Loading />;
  }
};

export default Render;
