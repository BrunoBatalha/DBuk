import { Box, Button, Grid, IconButton } from '@mui/material';
import { CategoryDomain } from 'domain/entities';
import { DialogDefault } from 'presentation/components/dialog-default/dialog-default';
import { PhotoCameraIcon } from 'presentation/components/icons';
import { IListCategoriesUseCase, IPublishPostUseCase } from 'presentation/interfaces/usecases';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CropImage } from '../crop-image/crop-image';
import { InputSelectCategories } from './components/input-select-categories/input-select-categories';
import { styles } from './styles';

type Props = {
  publishPostUseCase: IPublishPostUseCase;
  listCategoriesUseCase: IListCategoriesUseCase;
};

type FormStatePublishPost = {
  imageCropped: ImageSelection;
  categories: number[];
};

export type ImageSelection = {
  blob: Blob;
  url: string;
} | null;

export function PublishPost({ listCategoriesUseCase, publishPostUseCase }: Props): JSX.Element {
  const { t } = useTranslation();
  const [imagePreSelected, setImagePreSelected] = useState<ImageSelection>(null);
  const [isOpenDialogCropImage, setIsOpenDialogCropImage] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryDomain[]>([]);
  const [form, setForm] = useState<FormStatePublishPost>({
    imageCropped: null,
    categories: []
  });

  useEffect(() => {
    listCategoriesUseCase.execute().then((loadedCategories) => {
      setCategories(loadedCategories);
    });
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!form.imageCropped) {
      return;
    }

    await publishPostUseCase.execute({
      image: form.imageCropped.blob,
      categoriesIds: form.categories
    });

    setForm({ imageCropped: null, categories: [] });
    setImagePreSelected(null);
  }

  function onChangeFile({ target }: React.ChangeEvent<HTMLInputElement>) {
    if (target.files && target.files.length !== 0) {
      setImagePreSelected({
        blob: target.files[0],
        url: URL.createObjectURL(target.files[0])
      });
      setIsOpenDialogCropImage(true);
      target.value = '';
    }
  }

  return (
    <Box sx={styles.Form} component="form" onSubmit={onSubmit}>
      <Box component="img" sx={styles.Image} src={form.imageCropped?.url} />

      <InputSelectCategories
        categories={categories}
        categoriesIdSelected={form.categories}
        onSelect={(selecteds) => {
          setForm((prev) => ({ ...prev, categories: selecteds.map((s) => s.id) }));
        }}
      />

      <Grid container alignItems="center">
        <Grid item xs={10}>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            size="large"
            type="submit"
            disabled={form.imageCropped === null}
            data-testId="btn-submit"
          >
            {t('new_publish.publish')}
          </Button>
        </Grid>
        <Grid container item xs={2} justifyContent="center" alignItems="center">
          <IconButton color="primary" component="label">
            <input
              hidden
              type="file"
              accept="image/png, image/jpeg"
              onChange={onChangeFile}
              data-testId="input-file-upload"
            />
            <PhotoCameraIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>

      <DialogDefault
        isOpen={isOpenDialogCropImage}
        onCancel={(): void => {
          setForm((prev) => ({ ...prev, imageCropped: null }));
          setImagePreSelected(null);
          setIsOpenDialogCropImage(false);
        }}
        onConfirm={(): void => {
          setIsOpenDialogCropImage(false);
        }}
      >
        {imagePreSelected && (
          <CropImage
            urlImage={imagePreSelected.url}
            onChangeImage={(img) => setForm((prev) => ({ ...prev, imageCropped: img }))}
          />
        )}
      </DialogDefault>
    </Box>
  );
}
