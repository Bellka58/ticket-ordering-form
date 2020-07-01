import { countries } from "./countries";

export const genderOptions = [
    { key: "m", text: "Мужской", value: "male" },
    { key: "f", text: "Женский", value: "female" },
];

export const nationalityOptions = countries.map(country => ({
    key: country.key,
    text: country.country,
    value: country.country,
}));