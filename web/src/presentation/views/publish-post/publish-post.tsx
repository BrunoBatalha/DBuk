import { Box, Button, Grid, IconButton, LinearProgress } from '@mui/material';
import imageCompression from 'browser-image-compression';
import { CategoryDomain } from 'domain/entities';
import { AlertDefault } from 'presentation/components/alert-default/alert-default';
import { DialogDefault } from 'presentation/components/dialog-default/dialog-default';
import { PhotoCameraIcon } from 'presentation/components/icons';
import { LinearProgressWithLabel } from 'presentation/components/linear-progress-with-label/linear-progress-with-label';
import { useAlert } from 'presentation/hooks/useAlert';
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

type ImageSelection = {
  blob: Blob;
  url: string;
} | null;

export function PublishPost({ listCategoriesUseCase, publishPostUseCase }: Props): JSX.Element {
  const { t } = useTranslation();
  const [imagePreSelected, setImagePreSelected] = useState<ImageSelection>(null);
  const [isOpenDialogCropImage, setIsOpenDialogCropImage] = useState<boolean>(false);
  const [categories, setCategories] = useState<CategoryDomain[]>([]);
  const [form, setForm] = useState<FormStatePublishPost>({ imageCropped: null, categories: [] });
  const [isLoading, setLoading] = useState(true);
  const [croppedImage, setCroppedImage] = useState<Blob>();
  const [progressCompression, setProgressCompression] = useState(0);
  const { alert, setAlert } = useAlert();

  useEffect(() => {
    listCategoriesUseCase
      .execute()
      .then((loadedCategories) => setCategories(loadedCategories))
      .catch(() => setAlert({ isOpen: true, type: 'error', message: t('connection_failed') }))
      .finally(() => setLoading(false));
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setLoading(true);
    setAlert((prev) => ({ ...prev, isOpen: false }));

    try {
      await publishPostUseCase.execute({
        image: form.imageCropped!.blob,
        categoriesIds: form.categories
      });
      setAlert({ isOpen: true, type: 'success', message: t('new_publish.publication_successfully') });
    } catch (error) {
      setAlert({ isOpen: true, type: 'error', message: t('new_publish.publication_error') });
    } finally {
      setForm({ imageCropped: null, categories: [] });
      setImagePreSelected(null);
      setLoading(false);
    }
  }

  async function onChangeFile({ target }: React.ChangeEvent<HTMLInputElement>) {
    setAlert((prev) => ({ ...prev, isOpen: false }));

    if (!target.files || target.files.length === 0) {
      return;
    }
    try {
      const compressedFile = await compressImage(target.files[0]);

      setImagePreSelected({
        blob: compressedFile,
        url: URL.createObjectURL(compressedFile)
      });
      setIsOpenDialogCropImage(true);
      target.value = '';
    } catch (error) {
      console.error(error);
    }
  }

  async function compressImage(imageBlob: Blob) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (percentage: number) => {
        setProgressCompression(percentage);
        if (percentage === 100) {
          setTimeout(() => setProgressCompression(0), 1000);
        }
      }
    };

    try {
      const file = new File([imageBlob], '', { type: 'image/png' });
      return await imageCompression(file, options);
    } catch (error) {
      throw error;
    }
  }

  function canSubmit(): boolean {
    return !!(form.categories.length !== 0 && form.imageCropped && !isLoading);
  }

  return (
    <Box sx={styles.Form} component="form" onSubmit={onSubmit}>
      <Box sx={{ width: '100%' }}>
        {isLoading && <LinearProgress />}
        {progressCompression != 0 && <LinearProgressWithLabel value={progressCompression} />}

        <AlertDefault
          isOpen={alert.isOpen}
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
        />
      </Box>

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
            disabled={!canSubmit()}
            data-testid="btn-submit"
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
              data-testid="input-file-upload"
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
          if (!croppedImage) {
            return;
          }

          setIsOpenDialogCropImage(false);
          setForm((prev) => ({
            ...prev,
            imageCropped: {
              blob: croppedImage!,
              url: URL.createObjectURL(croppedImage)
            }
          }));
        }}
      >
        {imagePreSelected && (
          <CropImage urlImage={imagePreSelected.url} onChangeImage={(img) => setCroppedImage(img)} />
        )}
      </DialogDefault>
    </Box>
  );
}
