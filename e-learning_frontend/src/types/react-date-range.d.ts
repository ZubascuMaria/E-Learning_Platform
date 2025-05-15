declare module "react-date-range" {
    export interface Range {
      startDate: Date | null;
      endDate: Date | null;
      key: string;
    }
  
    export interface DateRangeProps {
      ranges: Range[];
      onChange: (ranges: { [key: string]: Range }) => void;
      moveRangeOnFirstSelection?: boolean;
      rangeColors?: string[];
    }
  
    export const DateRange: React.FC<DateRangeProps>;
  }
  