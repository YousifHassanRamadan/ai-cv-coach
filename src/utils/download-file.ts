import { toast } from "sonner";

export const downLoadFile = async (fileUrl: string, fileName: string) => {
  try {
    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error("Failed to fetch file for download");

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = fileName;

    document.body.appendChild(a);

    a.click();

    URL.revokeObjectURL(url);

    a.remove();

    toast.success("File downloaded successfully!");
  } catch (error) {
    console.error("Error downloading file:", error);
    toast.error("Failed to download file. Please try again.");
  }
};
