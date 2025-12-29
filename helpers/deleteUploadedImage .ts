export const deleteUploadedImage = async (publicId: string) => {
  try {
    const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    const response = await fetch(`${BASE_URL}/api/listing/image/${publicId}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('Failed to delete image:', data.message);
    }
    return data;
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};
