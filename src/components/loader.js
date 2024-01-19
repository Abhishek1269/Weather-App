import React from 'react';
import LoaderCss from "../Assets/loader.module.css";

export default function loader() {
  return (
    <div>
      <div className={LoaderCss.customloader}></div>
    </div>
  );
}