import Image from "next/image";

type Props = {
  galleryName: string;
  fileUrl: string;
  onClick: () => void;
};

export function GalleryItem({ fileUrl, galleryName, onClick }: Props) {
  return (
    <div className="w-12 lg:w-32 flex flex-col items-center text-center gap-2 cursor-pointer">
      <Image
        src={fileUrl}
        alt={galleryName}
        width={112}
        height={112}
        className="rounded-lg w-12 h-12 lg:w-28 lg:h-28 object-cover"
        onClick={onClick}
      />
      <span className="text-[10px] lg:text-sm">{galleryName}</span>
    </div>
  );
}
