import { Control } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { CreateAndEditJobType } from '@/utils/types';

type CustomFormFieldProps = {
  name: keyof CreateAndEditJobType;
  control: Control<CreateAndEditJobType>;
};

export function CustomFormField({ name, control }: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='capitalize'>{name}</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CustomFormSelectProps = {
  name: keyof CreateAndEditJobType;
  control: Control<CreateAndEditJobType>;
  items: string[];
  labelText?: string;
};

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
}: CustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-2">
          <FormLabel className='capitalize font-medium'>{labelText || name}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="focus:ring-2 focus:ring-primary/50">
                <SelectValue placeholder={`Select ${labelText || name}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="max-h-60">
              {items.map((item) => {
                return (
                  <SelectItem key={item} value={item} className="capitalize">
                    {item}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
export default CustomFormSelect;