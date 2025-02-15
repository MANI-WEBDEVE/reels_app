// src/app/dashboard/page.tsx
import MediaUploadForm from '@/components/MediaUploadForm';
// import UploadMedia from '@/components/UploadMedia';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <MediaUploadForm />
    </div>
  );
}
