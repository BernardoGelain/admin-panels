import { EntitySelector } from "~/components/crud/entity-selector/entity-selector";

export function CitySelector() {
  /*   const form = useFormContext();

  const cityName = form.watch("cityName");

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

/*   const citiesQuery = useGetEntityList<CityModel>({
    entityBaseUrl: "CITIES",
    queryKey: QUERY_KEYS.CITIES.LIST,
    keywords: debouncedSearch || cityName,
  }); */

  /*   const options = citiesQuery.data?.body.items.map((city) => ({
    label: city.name,
    value: String(city.id),
  }));  */

  return <EntitySelector onSearch={() => {}} search={""} fieldName="cityId" label="Cidade" isLoading={false} options={[]} />;
}
