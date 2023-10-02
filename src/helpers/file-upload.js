export async function uploadToCloudinary(file) {
  // if (!file) throw new Error('File not provided');
  if (!file) return null;

  // const url = import.meta.env.VITE_cloudinary_url;
  // const uploadPreset = import.meta.env.VITE_cloudinary_preset;
  const url = 'https://api.cloudinary.com/v1_1/pc-journal-app/image/upload';
  const uploadPreset = 'journal-app';

  const formData = new FormData();
  formData.append('upload_preset', uploadPreset);
  formData.append('file', file);

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Image could not be uploaded');

    const data = await response.json();

    return data;
  } catch (error) {
    // console.log('🚀 ~ uploadToCloudinary ~ error:', error);
    // throw new Error(error.message);
    return null;
  }
}
