import useCountries, { Country } from "@/app/custom-hooks/useCountries"
import Select from "react-select"

interface CountrySelectProps {
    value: Country | null;
    onChange: (value: Country | null) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
    const { getAllcountries } = useCountries();
    return (
        <Select<Country>
            placeholder="search for a country"
            isClearable
            options={getAllcountries()}
            value={value}
            onChange={onChange}
            formatOptionLabel={(option) => (
                <div className="flex items-center py-2">
                    <span className="text-[#02F5A1] font-semibold">{option.label}</span>
                    <span className="ml-2 text-[#02F5A1]/60 text-sm">{option.region}</span>
                </div>
            )}
            classNames={{
                control: () => "p-3 border-2",
                input: () => "text-lg",
                option: () => "text-lg",
            }}
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: "#07191E",
                    borderColor: "rgba(2,245,161,0.3)",
                    color: "#02F5A1",
                    boxShadow: "none",
                    "&:hover": { borderColor: "#02F5A1" },
                }),
                menu: (base) => ({ ...base, backgroundColor: "#07191E", border: "1px solid rgba(2,245,161,0.2)" }),
                option: (base, { isFocused }) => ({
                    ...base,
                    backgroundColor: isFocused ? "rgba(2,245,161,0.1)" : "#07191E",
                    color: "#02F5A1",
                }),
                singleValue: (base) => ({ ...base, color: "#02F5A1" }),
                input: (base) => ({ ...base, color: "#02F5A1" }),
                placeholder: (base) => ({ ...base, color: "rgba(2,245,161,0.4)" }),
                clearIndicator: (base) => ({ ...base, color: "rgba(2,245,161,0.6)", "&:hover": { color: "#02F5A1" } }),
                dropdownIndicator: (base) => ({ ...base, color: "rgba(2,245,161,0.6)", "&:hover": { color: "#02F5A1" } }),
                indicatorSeparator: (base) => ({ ...base, backgroundColor: "rgba(2,245,161,0.2)" }),
            }}
        />
    )
}
