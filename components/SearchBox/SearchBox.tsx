import type React from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox = ({ value, onChange }: SearchBoxProps) => {
  const debouncedChange = useDebouncedCallback((value: string) => {
    onChange(value);
  }, 100);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedChange(event.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Search notes"
    />
  );
};
export default SearchBox;
