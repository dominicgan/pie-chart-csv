import dayjs from 'dayjs';
import html2canvas from 'html2canvas';

const copyToClipboard = async () => {
  const element = document.getElementById('pie-chart');
  if (!element) return;

  const canvas = await html2canvas(element);
  canvas.toBlob(async (blob) => {
    if (blob && navigator.clipboard) {
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      alert('Chart copied to clipboard!');
    } else {
      alert('Clipboard API not supported!');
    }
  });
};

const downloadUI = async () => {
  const element = document.getElementById('pie-chart');
  if (!element) return;

  const canvas = await html2canvas(element);
  const dataURL = canvas.toDataURL('image/png');

  const requestDate = dayjs().format('YYYYMMDDHHmmss');
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = `pie-chart-${requestDate}.png`;
  link.click();
};

export { copyToClipboard, downloadUI };
