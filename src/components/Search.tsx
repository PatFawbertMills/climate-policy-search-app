import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
  Spinner,
} from "@chakra-ui/react";

// Simple resuable search component
export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [spinner, setSpinner] = useState(false);
  const searchTerm = searchParams.get("q");

  // If we refresh the page, or we set the searchTerm from elsewhere populate our search
  useEffect(() => {
    setSearch(searchTerm ?? "");
  }, [searchTerm]);

  // Delay the search until we feel as though the user has finished typing their search (half a second)
  useEffect(() => {
    setSpinner(true);
    const delaySearch = setTimeout(() => {
      // Don't want to get 'q=' in the query string if we haven't run a search
      setSearchParams(search === "" ? "" : { q: search });
      setSpinner(false);
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [search]);

  return (
    <FormControl>
      <FormLabel htmlFor="search">Search</FormLabel>
      <InputGroup w={["auto", "auto", "50%"]}>
        <Input
          id="search"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputRightElement>{spinner && <Spinner />}</InputRightElement>
      </InputGroup>
      <FormHelperText>
        Use this search box to filter out results based on their title and
        description
      </FormHelperText>
    </FormControl>
  );
};
