'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Option } from 'lucide-react';

type MultiSelectOption = {
  value: string;
  label: string;
  style?: React.CSSProperties;
};

type Props = {
  options: MultiSelectOption[];
  onSelect: (values: string[]) => void;
  defaultValues?: string[];
};

export function MultiSelect({ options, defaultValues = [], onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState<string[]>(defaultValues);
  const [filteredOptions, setFilteredOptions] =
    useState<MultiSelectOption[]>(options);
  const [search, setSearch] = useState('');
  const [displayInput, setDisplayInput] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Hide input when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDisplayInput(false);
        setHighlightedIndex(null);
        setSearch('');
        setTimeout(() => setOpen(false), 100);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref]);

  // Update filtered options when values or search change
  useEffect(() => {
    const updatedOptions = options.filter(
      (option) =>
        !values.includes(option.value) &&
        option.label.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredOptions(updatedOptions);
  }, [values, search, options]);

  // Handle selection and de-selection of values
  const onValueChange = (value: string) => {
    setValues((prev) => {
      const updatedValues = prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value];
      onSelect(updatedValues);
      return updatedValues;
    });
  };

  // Handle input keydown events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key, currentTarget } = e;

    switch (key) {
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex !== null) {
          const selectedOption = filteredOptions[highlightedIndex];
          if (selectedOption) {
            onValueChange(selectedOption.value);
          }
        } else if (currentTarget.value) {
          onValueChange(currentTarget.value);
        }
        setSearch('');
        setHighlightedIndex(null);
        break;
      case 'Backspace':
        if (!currentTarget.value && values.length > 0) {
          onValueChange(values[values.length - 1]);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          if (prev === null || prev === 0) return filteredOptions.length - 1;
          return prev - 1;
        });
        break;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => {
          if (prev === null || prev === filteredOptions.length - 1) return 0;
          return prev + 1;
        });
        break;
      case 'Escape':
        setOpen(false);
        break;
    }
  };

  return (
    <>
      <div
        ref={ref}
        className={`flex px-2 items-center justify-start overflow-x-auto overflow-y-hidden h-10 w-full rounded-md border border-input bg-background text-sm outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus:ring-2 focus:ring-ring focus:ring-offset-2`}
        tabIndex={0}
        role="listbox"
        onFocus={() => setDisplayInput(true)}
        onBlur={() => {
          setDisplayInput(false);
          setHighlightedIndex(null);
          setSearch('');
          setOpen(false);
        }}
        onClick={() => setDisplayInput(true)}
      >
        {values.length > 0 && (
          <div className="flex items-center">
            {values.map((value) => (
              <Badge
                key={value}
                className="mr-1"
                variant={'outline'}
                style={options.find((opt) => opt.value === value)?.style}
              >
                {value}
              </Badge>
            ))}
          </div>
        )}
        {displayInput && (
          <Input
            className="w-full px-1 py-0 border-0 bg-transparent shadow-none rounded-none outline-none ring-0 ring-transparent focus-visible:ring-0 focus-visible:ring-transparent"
            placeholder="Select option..."
            value={search}
            autoFocus={displayInput}
            onFocus={() => {
              setOpen(true);
            }}
            onBlur={() =>
              setTimeout(() => {
                setOpen(false);
                setHighlightedIndex(null);
                setSearch('');
                setDisplayInput(false);
              }, 100)
            }
            onChange={(e) => setSearch(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
          />
        )}
      </div>

      <div className="relative">
        {open && filteredOptions.length !== 0 && (
          <ul className="absolute z-50 w-72 p-2 rounded-md border bg-popover shadow-md">
            {filteredOptions.map((option, index) => (
              <li
                key={option.value}
                className={`flex items-center cursor-pointer p-2 rounded-sm text-sm hover:bg-muted-foreground/15 
                                    ${highlightedIndex === index ? 'bg-muted-foreground/15' : ''}
                                `}
                onClick={() => onValueChange(option.value)}
              >
                <Option size={16} className="mr-2" />
                <span>{option.label}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
