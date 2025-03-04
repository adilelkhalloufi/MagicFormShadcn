import * as React from "react"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "./badge"

interface ComboBoxProps {
  data: { value: any; name: string; [key: string]: any }[];
  title?: string;
  emptyMessage?: string;
  clearMessage?: string;
  onSelectionChange?: (selectedValues: any[] | any) => void;
  multiSelect?: boolean;
  returnFullObject?: boolean;
  isLoading?: boolean;
  defaultValue?: any[] | any;
  disabled?: boolean;
  placeholder?: string;
}

export function Combobox({
  data,
  title = "",
  emptyMessage = "No items found",
  clearMessage = "Clear selection",
  onSelectionChange,
  multiSelect = false,
  returnFullObject = false,
  isLoading = false,
  defaultValue = multiSelect ? [] : "",
  disabled = false,
  placeholder = "Search..."
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValues, setSelectedValues] = React.useState<any[]>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  )

  React.useEffect(() => {
    if (onSelectionChange) {
      const returnValue = multiSelect
        ? returnFullObject 
          ? selectedValues.map(v => data.find(item => item.value === v))
          : selectedValues
        : returnFullObject
          ? data.find(item => item.value === selectedValues[0])
          : selectedValues[0] || "";
      onSelectionChange(returnValue);
    }
  }, [selectedValues]);

  const handleSelect = (currentValue: string) => {
    if (multiSelect) {
      setSelectedValues(prev => 
        prev.includes(currentValue)
          ? prev.filter(v => v !== currentValue)
          : [...prev, currentValue]
      )
    } else {
      setSelectedValues([currentValue])
      setOpen(false)
    }
  }

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return ""
    
    if (multiSelect) {
      return selectedValues.map(v => data.find(item => item.value === v)?.name).join(", ")
    }
    
    return data.find(item => item.value === selectedValues[0])?.name
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1 items-center">
            {multiSelect && selectedValues.length > 0 ? (
              selectedValues.map(value => (
                <Badge key={value} variant="secondary">
                  {data.find(item => item.value === value)?.name}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">
                {getDisplayValue() || title}
              </span>
            )}
          </div>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValues.includes(item.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

