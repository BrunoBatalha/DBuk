import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { CategoryDomain } from 'domain/entities';
import { useTranslation } from 'react-i18next';

type Props = {
  onSelect(categorieSelected: CategoryDomain[]): void;
  categories: CategoryDomain[];
  categoriesIdSelected: number[];
};

export function InputSelectCategories({ onSelect, categories, categoriesIdSelected }: Props) {
  const { t } = useTranslation();

  function onChangeCategories({ target: { value } }: SelectChangeEvent<number[]>) {
    const valueFormatted = (typeof value === 'string' ? value.split(',') : value) as number[];
    onSelect(categories.filter((c) => valueFormatted.includes(c.id)));
  }

  function renderValue(categorySelected: number[]) {
    return categories
      .filter((c) => categorySelected.indexOf(c.id) !== -1)
      .map((c) => t(`new_publish.categories.${c.id}`))
      .join(', ');
  }

  return (
    <FormControl sx={{ marginTop: 4, marginBottom: 4, width: '100%' }}>
      <InputLabel id="input">{t('new_publish.select_category')}</InputLabel>
      <Select
        labelId="input"
        multiple
        value={categoriesIdSelected}
        onChange={onChangeCategories}
        input={<OutlinedInput label={t('new_publish.select_category')} />}
        renderValue={renderValue}
        data-testid="select-category"
      >
        {categories.map((c) => (
          <MenuItem key={c.id} value={c.id} data-testid="select-category-item">
            <Checkbox checked={categoriesIdSelected.indexOf(c.id) > -1} />
            <ListItemText primary={t(`new_publish.categories.${c.id}`)} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
