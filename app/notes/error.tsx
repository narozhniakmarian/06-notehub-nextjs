"use client";

import css from "./error.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.wrapperError}>
      <p className={css.erroeMessage}>
        Oops! Something went wrong. Try again.{" "}
      </p>
    </div>
  );
}
