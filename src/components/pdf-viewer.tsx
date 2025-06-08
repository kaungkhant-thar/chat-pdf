"use client";

import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import {
  defaultLayoutPlugin,
  ToolbarProps,
  ToolbarSlot,
} from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = ({ fileUrl }: { fileUrl: string }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar: (Toolbar: (props: ToolbarProps) => React.ReactElement) => (
      <Toolbar>
        {(slots: ToolbarSlot) => {
          const {
            ShowSearchPopover,
            ZoomOut,
            Zoom,
            ZoomIn,
            GoToPreviousPage,
            CurrentPageInput,
            NumberOfPages,
            GoToNextPage,
            Download,
            Print,
            EnterFullScreen,
          } = slots;

          return (
            <div className="flex items-center w-full p-2 bg-gray-100 gap-2">
              <ShowSearchPopover />
              <ZoomOut />
              <Zoom />
              <ZoomIn />
              <div className="ml-auto flex items-center gap-1">
                <GoToPreviousPage />
                <CurrentPageInput />
                <span>/</span>
                <NumberOfPages />
                <GoToNextPage />
              </div>
              <EnterFullScreen />
              <Download />
              <Print />
            </div>
          );
        }}
      </Toolbar>
    ),
    sidebarTabs: () => [],
  });

  return (
    <div className="basis-1/2 h-screen rounded ">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
