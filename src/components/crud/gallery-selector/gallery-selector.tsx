import InfiniteScroll from "react-infinite-scroll-component";
import { useGetInfiniteGalleries } from "./hooks/use-get-infinite-galleries";
import { useEffect, useState } from "react";
import { GalleryModel } from "~/page-components/crud/galleries-page/types/gallery-model";
import { Input } from "~/components/ui/input";
import { GalleryItem } from "./components/gallery-item/gallery-item";
import { useFormContext } from "react-hook-form";

type Props = {
  defaultSelectedGalleries?: GalleryModel[];
  name: string;
};

export function GallerySelector({ defaultSelectedGalleries, name }: Props) {
  const formContext = useFormContext();
  const [keywords, setKeywords] = useState("");
  const { fetchNextPage, galleries, hasNextPage } = useGetInfiniteGalleries({
    keywords,
  });

  const [selectedGalleries, setSelectedGalleries] = useState<GalleryModel[]>(
    defaultSelectedGalleries ?? []
  );

  const handleGalleryClick = (gallery: GalleryModel) => {
    setSelectedGalleries((prev) => {
      if (prev.includes(gallery)) {
        return prev.filter((g) => g !== gallery);
      }

      return [...prev, gallery];
    });
  };

  useEffect(() => {
    formContext.setValue(
      name,
      selectedGalleries.map((g) => g.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formContext, selectedGalleries.length, name]);

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Galeria</h3>
      <div className="flex gap-4">
        <div
          id="scrollableDiv"
          className="w-1/2 h-96 overflow-auto border rounded-lg p-4"
        >
          <h3 className="text-center my-4 font-semibold lg:text-lg">
            Clique nas imagens para selecionar a galeria que deseja associar
          </h3>
          <Input
            placeholder="Pesquisar galerias"
            className="my-4"
            onChange={(e) => setKeywords(e.target.value)}
          />
          <InfiniteScroll
            dataLength={galleries.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
            loader={<h4 className="text-center my-4">Carregando</h4>}
            scrollableTarget="scrollableDiv"
            className="flex flex-wrap gap-4 justify-center"
          >
            {galleries
              .filter((gallery) => !selectedGalleries.includes(gallery))
              .map((gallery) => (
                <GalleryItem
                  key={gallery.id}
                  {...gallery}
                  onClick={() => handleGalleryClick(gallery)}
                />
              ))}
          </InfiniteScroll>

          {!hasNextPage && galleries.length > 0 && (
            <div className="text-center mt-4 text-gray-500">
              Nenhuma galeria adicional disponível
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4 justify-center w-1/2 h-96 overflow-auto border rounded-lg p-4">
          {selectedGalleries.map((gallery) => (
            <GalleryItem
              key={gallery.id}
              {...gallery}
              onClick={() => handleGalleryClick(gallery)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
