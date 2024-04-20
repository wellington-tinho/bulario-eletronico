import axios from 'axios';

export const handleDownload = async (url:string, filename:string) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(response.data);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Download error:', error);
  }
};
