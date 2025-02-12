import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import pdf from "./Nguyen_HuuQuangNhat__2025.pdf";

PdfDisplay.propTypes = {};

function PdfDisplay() {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <div style={{ margin: 0 }}>{<Viewer fileUrl={"./sample1.pdf"} />}</div>
      </Worker>
    </div>
  );
}

export default PdfDisplay;
