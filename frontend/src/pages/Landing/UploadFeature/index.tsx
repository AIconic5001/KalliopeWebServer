<<<<<<< HEAD
import { Alert, Button, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
=======
import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
>>>>>>> parent of f0ab669 (remove redundant)
import { FileTypes } from "../../../@types/FileTypes/file.type";
import "./styles.scss";
import Grid from "@mui/material/Grid2";
import { Alert, Button, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { ALLOWED_TYPES, API_CONFIG } from "../../../constants/api.constant";
import FeatSummaries from "./Components/FeatSummaries";
import { useGetAllFiles, useUploadFile } from "../handleFilesApi";

UploadFeature.propTypes = {};

function UploadFeature() {
  const [file, setFile] = useState<Array<FileTypes>>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const {
    mutate: uploadFile,
    isSuccess: uploadSuccess,
    isPending: pendingUpload,
    isError: uploadError,
  } = useUploadFile();

  // Improved file validation
  const validateFile = (file: File): boolean => {
    if (!file) return false;

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!extension || !ALLOWED_TYPES.includes(extension)) {
      setFileError(
        `Invalid file type. Allowed types: ${ALLOWED_TYPES.join(", ")}`
      );
      return false;
    }

    // if (file.size > 10 * 1024 * 1024) {
    //   // 10MB limit
    //   setFileError("File size exceeds 10MB limit");
    //   return false;
    // }

    setFileError(null);
    return true;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile && validateFile(selectedFile)) {
      uploadFile(selectedFile);
    }
  };

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    // Do something with the files
    const updatedList = [
      ...file,
      ...acceptedFiles.map((f: File) => ({
        name: f.name,
        url: URL.createObjectURL(f),
      })),
    ];
    setFile(updatedList);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <section className="upload-container" id="upload">
      <Grid container spacing={4}>
        <Grid size={12} mb={4} fontSize={"80px"}>
          <Typography variant="h1" align="center" className="title">
            Upload your research paper
          </Typography>
        </Grid>

        <Grid size={10} m={"auto"}>
          <div {...getRootProps()} className="dropzone-container">
            <input
              {...getInputProps()}
              onChange={handleFileSelect}
              accept={ALLOWED_TYPES.map((t) => `.${t}`).join(",")}
            />
            {isDragActive ? (
              <Typography variant="body2" className="secondary-text">
                Drop the files here ...
              </Typography>
            ) : (
              <Typography
                variant="body1"
                sx={{ fontStyle: "italic", fontSize: "1.5rem" }}
                className="secondary-text"
              >
                Drop some files here, or
                <span style={{ color: "var(--primary-dark)" }}> click</span> to
                select files
              </Typography>
            )}
          </div>
        </Grid>
        <Stack spacing={2} mb={0} sx={{ width: "83%" }} margin={"auto"}>
          {fileError && (
            <Alert severity="warning">{`Error: ${
              fileError || "Invalid file"
            }`}</Alert>
          )}

          {/* Upload status */}
          {uploadError && (
            <Alert severity="error">{`Error: ${
              uploadError || "Upload failed"
            }`}</Alert>
          )}

          {uploadSuccess && (
            <Alert severity="success">{`File ${
              selectedFile && selectedFile.name
            } uploaded successfully!`}</Alert>
          )}

          {/* File preview */}
          {selectedFile && <div className="file-preview"></div>}
        </Stack>
        {selectedFile && (
          <Grid container size={12} sx={{ textAlign: "center" }}>
            <Grid size={6}>
              <Typography variant="h6">Selected file:</Typography>
              <Typography variant="body1">{selectedFile.name}</Typography>
            </Grid>
            <Grid size={6}>
              <Button
                color="secondary"
                onClick={handleUpload}
                disabled={!selectedFile || pendingUpload}
                variant="outlined"
                sx={{ width: "50%" }}
              >
                {pendingUpload ? "Uploading..." : "Upload File"}
              </Button>
            </Grid>
          </Grid>
        )}

        <div className="feat-summaries-container">
          <FeatSummaries />
        </div>
      </Grid>
    </section>
  );
}

export default UploadFeature;
