import { forwardRef } from "react";
import { Text, Group } from "@mantine/core";
import ReactCountryFlag from "react-country-flag";
export interface CountrySelectProps
  extends React.ComponentPropsWithoutRef<"div"> {
  value: string;
  label: string;
}

export const CountrySelect = forwardRef<HTMLDivElement, CountrySelectProps>(
  ({ value, label, ...others }: CountrySelectProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <ReactCountryFlag countryCode={value} />
        <div>
          <Text size="sm">{label}</Text>
        </div>
      </Group>
    </div>
  )
);

CountrySelect.displayName = "CountrySelect";
