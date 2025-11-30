'use client'

import React, { useState, useEffect, useRef } from 'react';
import { IconCalendar, IconX } from '@tabler/icons-react';

interface YearRange {
  startYear: number | null;
  endYear: number | null;
}

interface CustomYearPickerProps {
  placeholder?: string;
  yearRangeStart?: number;
  yearRangeEnd?: number;
  allowRange?: boolean;
  locale: string;
  value?: YearRange | null;
  onChange?: (value: YearRange | null) => void;
  disabled?: boolean;
  inline?: boolean;
}

const CustomYearPicker: React.FC<CustomYearPickerProps> = ({
  placeholder = 'Select year',
  yearRangeStart = 1900,
  yearRangeEnd = 2030,
  allowRange = true,
  locale,
  value,
  onChange,
  disabled = false,
  inline = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const isRTL = locale === 'ar';

  // Generate years array
  useEffect(() => {
    const yearsList: number[] = [];
    for (let year = yearRangeEnd; year >= yearRangeStart; year--) {
      yearsList.push(year);
    }
    setYears(yearsList);
  }, [yearRangeStart, yearRangeEnd]);

  // Update selectedYears when value prop changes
  useEffect(() => {
    if (value && (value.startYear !== null || value.endYear !== null)) {
      const newSelectedYears: number[] = [];
      if (value.startYear !== null) {
        newSelectedYears.push(value.startYear);
      }
      // For range selection, add endYear only if it's different from startYear
      if (value.endYear !== null && value.endYear !== value.startYear) {
        newSelectedYears.push(value.endYear);
      }
      // For single year selection where startYear === endYear, we already have the year
      newSelectedYears.sort((a, b) => a - b);
      setSelectedYears(newSelectedYears);
    } else {
      setSelectedYears([]);
    }
  }, [value]);

  // Handle click outside to close picker
  useEffect(() => {
    if (inline) return; // No outside-click handling in inline mode
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen && !inline) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, inline]);

  const togglePicker = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const closePicker = () => {
    setIsOpen(false);
  };

  const selectYear = (year: number) => {
    if (disabled) return;

    let newSelectedYears: number[];
    let shouldClosePicker = false; // Keep picker open to allow selecting range

    if (!allowRange) {
      // Single year selection - keep picker open for potential range selection
      newSelectedYears = [year];
      shouldClosePicker = false;
    } else {
      // Range selection logic
      if (selectedYears.length === 0) {
        // First year selected - keep picker open
        newSelectedYears = [year];
      } else if (selectedYears.length === 1) {
        if (selectedYears[0] === year) {
          // Same year clicked - keep as single year, keep picker open
          newSelectedYears = [year];
        } else {
          // Second year selected - now we have a range, keep picker open for adjustments
          newSelectedYears = [selectedYears[0], year].sort((a, b) => a - b);
        }
      } else {
        // Start new selection - keep picker open
        newSelectedYears = [year];
      }
    }

    // Update local state immediately for UI responsiveness
    setSelectedYears(newSelectedYears);

    // Notify parent component ONLY when a full range is selected (two different years)
    // Single year selection should not apply until the user clicks "Done"
    if (newSelectedYears.length === 2 && newSelectedYears[0] !== newSelectedYears[1]) {
      updateValue(newSelectedYears);
    }

    // Close picker if appropriate
    if (shouldClosePicker) {
      setIsOpen(false);
    }
  };

  const updateValue = (selectedYearsArray: number[]) => {
    const range: YearRange = {
      startYear: selectedYearsArray.length > 0 ? selectedYearsArray[0] : null,
      endYear: selectedYearsArray.length > 1 ? selectedYearsArray[1] : selectedYearsArray[0]
    };

    onChange?.(range);
  };

  const applySingleSelection = () => {
    if (disabled) return;
    if (selectedYears.length === 1) {
      updateValue(selectedYears);
    }
  };

  const clearSelection = () => {
    if (disabled) return;

    setSelectedYears([]);
    onChange?.(null);
  };

  const isYearSelected = (year: number): boolean => {
    return selectedYears.includes(year);
  };

  const isYearInRange = (year: number): boolean => {
    if (selectedYears.length !== 2) return false;
    const [start, end] = selectedYears;
    return year > start && year < end;
  };

  const isStartYear = (year: number): boolean => {
    return selectedYears.length >= 1 && selectedYears[0] === year;
  };

  const isEndYear = (year: number): boolean => {
    return selectedYears.length === 2 && selectedYears[1] === year;
  };

  const getDisplayText = (): string => {
    // Use the value prop directly for display to avoid sync issues
    if (value && (value.startYear !== null || value.endYear !== null)) {
      if (value.startYear !== null && value.endYear !== null) {
        if (value.startYear === value.endYear) {
          // Single year selection
          return value.startYear.toString();
        } else {
          // Range selection
          return `${value.startYear}-${value.endYear}`;
        }
      } else if (value.startYear !== null) {
        // Only start year
        return value.startYear.toString();
      } else if (value.endYear !== null) {
        // Only end year
        return value.endYear.toString();
      }
    }
    return '';
  };

  return (
    <div className="relative w-full" ref={containerRef} dir={isRTL ? 'rtl' : 'ltr'}>
      {inline ? (
        <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
            <span className="font-semibold text-gray-800">
              {isRTL ? 'اختر السنة' : 'Select Year'}
            </span>
            <div className="flex items-center gap-2">
              {selectedYears.length === 1 && !disabled && (
                <button
                  type="button"
                  className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                  onClick={applySingleSelection}
                >
                  {isRTL ? 'تم' : 'Done'}
                </button>
              )}
              {selectedYears.length > 0 && !disabled && (
                <button
                  type="button"
                  className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  onClick={clearSelection}
                >
                  {isRTL ? 'مسح' : 'Clear'}
                </button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 p-4 max-h-80 overflow-y-auto">
            {years.map((year) => (
              <div
                key={year}
                className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all text-sm font-medium border ${
                  isYearSelected(year)
                    ? 'bg-blue-500 text-white border-blue-500'
                    : isYearInRange(year)
                    ? 'bg-blue-50 text-blue-600 border-blue-200'
                    : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-800'
                } ${disabled ? 'cursor-not-allowed opacity-50' : 'active:scale-95'}`}
                onClick={() => selectYear(year)}
              >
                {year}
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-center">
            <small className="text-gray-500 text-xs">
              {isRTL ? 'انقر مرة لاختيار سنة ثم اضغط تم، أو مرتين لاختيار نطاق' : 'Click once then Done for single year, or twice for a range'}
            </small>
          </div>
        </div>
      ) : (
        <>
          {/* Input field */}
          <div
            className={`relative cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={togglePicker}
          >
            <input
              type="text"
              readOnly
              value={getDisplayText()}
              placeholder={placeholder}
              className={`w-full px-3 py-2 text-sm border border-gray-200 rounded-md bg-gray-50 cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white ${
                isRTL ? 'pr-10 pl-3' : 'pl-3 pr-10'
              } ${disabled ? 'cursor-not-allowed' : 'hover:border-blue-400'}`}
              disabled={disabled}
            />
            <IconCalendar
              size={16}
              className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none ${
                isRTL ? 'left-3' : 'right-3'
              }`}
            />
          </div>

          {/* Dropdown panel */}
          {isOpen && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg min-w-80 max-h-96 overflow-hidden animate-in slide-in-from-top-2 duration-200">
              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 bg-gray-50">
                <span className="font-semibold text-gray-800">
                  {isRTL ? 'اختر السنة' : 'Select Year'}
                </span>
                <div className="flex items-center gap-2">
                  {selectedYears.length === 1 && !disabled && (
                    <button
                      type="button"
                      className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                      onClick={applySingleSelection}
                    >
                      {isRTL ? 'تم' : 'Done'}
                    </button>
                  )}
                  {selectedYears.length > 0 && !disabled && (
                    <button
                      type="button"
                      className="px-2 py-1 text-xs text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                      onClick={clearSelection}
                    >
                      {isRTL ? 'مسح' : 'Clear'}
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4 max-h-60 overflow-y-auto">
                {years.map((year) => (
                  <div
                    key={year}
                    className={`flex items-center justify-center p-2 rounded-md cursor-pointer transition-all text-sm font-medium border ${
                      isYearSelected(year)
                        ? 'bg-blue-500 text-white border-blue-500'
                        : isYearInRange(year)
                        ? 'bg-blue-50 text-blue-600 border-blue-200'
                        : 'text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-800'
                    } ${disabled ? 'cursor-not-allowed opacity-50' : 'active:scale-95'}`}
                    onClick={() => selectYear(year)}
                  >
                    {year}
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 text-center">
                <small className="text-gray-500 text-xs">
                  {isRTL ? 'انقر مرة لاختيار سنة ثم اضغط تم، أو مرتين لاختيار نطاق' : 'Click once then Done for single year, or twice for a range'}
                </small>
              </div>
            </div>
          )}

          {/* Backdrop */}
          {isOpen && (
            <div
              className="fixed inset-0 z-40 bg-transparent"
              onClick={closePicker}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomYearPicker;