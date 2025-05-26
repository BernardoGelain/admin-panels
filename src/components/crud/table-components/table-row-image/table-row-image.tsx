import Image from "next/image";

type Props = {
  imageUrl: string;
};

export function TableRowImage({ imageUrl }: Props) {
  if (!imageUrl) return <></>;

  return (
    <Image
      src={imageUrl}
      className="w-12 h-12 rounded-md object-cover"
      width={48}
      height={48}
      alt="category image"
    />
  );
}
