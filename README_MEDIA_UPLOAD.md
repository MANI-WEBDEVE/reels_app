# Media Upload Implementation Guide

This guide explains how to use the MediaUploadForm component for uploading images and videos with titles and descriptions.

## Features
- Upload images and videos using ImageKit integration
- Add title and description for each media item
- Display upload progress
- View uploaded media items in a grid layout
- Delete uploaded media items

## How to Use

1. Import the MediaUploadForm component:
```tsx
import MediaUploadForm from '@/components/MediaUploadForm';
```

2. Use the component in your page or component:
```tsx
export default function YourPage() {
  return (
    <div>
      <MediaUploadForm />
    </div>
  );
}
```

3. When using the form:
   - Enter a title for your media
   - Add a description
   - Click on the file input to select an image or video
   - Wait for the upload to complete
   - Your media item will appear in the list below with its title and description

## File Type Support
- Images: jpeg, jpg, webp, png (max size: 10MB)
- Videos: Common video formats (max size: 100MB)

## Important Notes
- Make sure your ImageKit configuration is properly set up in the ProviderKit component
- The component automatically handles file validation and upload progress
- All uploaded files are stored in ImageKit's storage
- Each media item is stored with its associated title and description