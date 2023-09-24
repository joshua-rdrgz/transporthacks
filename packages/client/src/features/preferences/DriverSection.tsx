import { UseFormReturn } from 'react-hook-form';
import { PreferenceFormSchema } from '@/features/preferences/PreferenceForm';
import { TUserPreferenceProps } from '@/context/user-preference-context';
import { Form } from '@/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';

const DRIVER_INPUTS = [
  {
    name: 'carBuyingPrice' as const,
    label: 'How expensive is your car?',
    placeholder: 'Pick a price category....',
    items: [
      { value: '4', content: 'Not Very Expensive' },
      { value: '3', content: 'Not Expensive' },
      { value: '2', content: 'Expensive' },
      { value: '1', content: 'Very Expensive' },
    ],
  },
  {
    name: 'numDoors' as const,
    label: 'How many doors does your car have?',
    placeholder: 'Pick how many of doors....',
    items: [
      { value: '4', content: 'One' },
      { value: '3', content: 'Two' },
      { value: '2', content: 'Three' },
      { value: '1', content: 'Four' },
    ],
  },
  {
    name: 'numSeats' as const,
    label: 'How many seats does your car have?',
    placeholder: 'Pick how many of seats....',
    items: [
      { value: '4', content: 'One' },
      { value: '3', content: 'Two' },
      { value: '2', content: 'Three' },
      { value: '1', content: 'Four' },
    ],
  },
  {
    name: 'luggageBootSize' as const,
    label: 'How big is your trunk?',
    placeholder: 'Pick how big your trunk is....',
    items: [
      { value: '4', content: 'Very Small' },
      { value: '3', content: 'Small' },
      { value: '2', content: 'Big' },
      { value: '1', content: 'Very Big' },
    ],
  },
  {
    name: 'safetyRating' as const,
    label: 'How safe do you feel in your car?',
    placeholder: 'Rate how safe you feel....',
    items: [
      { value: '4', content: 'Very Unsafe' },
      { value: '3', content: 'Unsafe' },
      { value: '2', content: 'Safe' },
      { value: '1', content: 'Very Safe' },
    ],
  },
  {
    name: 'popularity' as const,
    label: 'How popular is your car model?',
    placeholder: "Rate your car's popularity....",
    items: [
      { value: '4', content: 'Very Unpopular' },
      { value: '3', content: 'Unpopular' },
      { value: '2', content: 'Popular' },
      { value: '1', content: 'Very Popular' },
    ],
  },
];

interface IDriverSectionProps {
  preferenceForm: UseFormReturn<PreferenceFormSchema>;
  curUserPreferences: TUserPreferenceProps;
  onDisplay: boolean;
}

export function DriverSection({
  preferenceForm,
  curUserPreferences,
  onDisplay,
}: IDriverSectionProps) {
  return (
    <section className='flex flex-col gap-5'>
      <div>
        <h3 className='text-xl font-semibold text-center'>
          Since You&apos;re A Driver....
        </h3>
        <p className='text-md text-center'>
          We&apos;ll use Machine Learning to tell you how your car&apos;s doing!
        </p>
      </div>
      <div>
        {DRIVER_INPUTS.map((input) => (
          <Form.Field
            key={input.name}
            control={preferenceForm.control}
            name={input.name}
            render={({ field }) => (
              <Form.Item>
                <Form.Label>{input.label}</Form.Label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={`${field.value}`}
                >
                  <Form.Control>
                    <SelectTrigger>
                      <SelectValue placeholder={input.placeholder} />
                    </SelectTrigger>
                  </Form.Control>
                  <SelectContent>
                    {input.items.map((item) => (
                      <SelectItem
                        key={item.value}
                        value={item.value}
                        defaultChecked={
                          item.value === curUserPreferences[input.name]
                        }
                      >
                        {item.content}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Form.Message />
              </Form.Item>
            )}
          />
        ))}
      </div>
    </section>
  );
}
