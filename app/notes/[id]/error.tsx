"use client";
import css from "./error.module.css";
type ErrorProps = {
  error: Error;
};
const Error = ({ error }: ErrorProps) => {
  return (
    <p className={css.text}>Could not fetch note details. {error.message}</p>
  );
};

export default Error;
