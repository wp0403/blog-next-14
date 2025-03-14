import { Metadata } from "next";
import PhotoGalleryClient from "./photo-client";

export const metadata: Metadata = {
  title: "摄影 - Photography",
  description: "摄影作品展示",
  openGraph: {
    title: "摄影 - Photography",
    description: "摄影作品展示",
  },
};

const PhotoGalleryPage = () => {
  return <PhotoGalleryClient />;
};

export default PhotoGalleryPage; 