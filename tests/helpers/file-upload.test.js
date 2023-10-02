import { v2 as cloudinary } from 'cloudinary';
import { getEnvConfig } from '../../src/helpers';
import { uploadToCloudinary } from '../../src/helpers/file-upload';

const env = getEnvConfig();

cloudinary.config({
  cloud_name: 'pc-journal-app',
  api_key: env.VITE_cloudinary_api_key,
  api_secret: env.VITE_cloudinary_api_secret,
  secure: true,
});

const imgUrl =
  'https://i.kym-cdn.com/entries/icons/square/000/016/749/10262051_10202271916658945_1058480794194592846_n.jpg';

describe('file-upload Tests', () => {
  test('debe subir el archivo correctamente a cloudinary', async () => {
    const response = await fetch(imgUrl);
    const blob = await response.blob();

    const file = new File([blob], 'image.jpg');

    const { secure_url, public_id } = await uploadToCloudinary(file);

    expect(typeof secure_url).toBe('string');

    await cloudinary.api.delete_resources([public_id]);
  });

  test('debe retornar null si no se manda una imagen', async () => {
    const file = new File([], 'image.jpg');

    const data = await uploadToCloudinary(file);

    expect(data).toBe(null);
  });
});
