'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

const CreateStoryForm = () => {
  const router = useRouter();
  const [prevImage, setPrevImage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isFileTooBig, setIsFileTooBig] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FieldValues>();

  const image = watch('photo');

  React.useEffect(() => {
    if (image) {
      console.log('a');

      getBase64(image[0]).then((res) => setPrevImage(res as string));
    } else {
      return;
    }
  }, [image]);

  const getBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      console.log('b');
      if (file === undefined) return;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const onSubmit = (data: FieldValues) => {
    setIsLoading(true);
    console.log('c');
    if (data.photo[0]) {
      getBase64(data.photo[0])
        .then((res) => {
          if (image[0].size / 1024 > 3072) {
            setIsFileTooBig(true);
            setIsLoading(false);
            return;
          }
          axios
            .post('/api/add_new', {
              name: data.name,
              subname: data.subname,
              subsubname: data.subsubname,
              photo: res,
              info: data.info,
            })
            .then(() => {
              setIsLoading(false);
              toast.success('История отправлена!');
              router.refresh();
              router.push('/');
            });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post('/api/add_new', {
          name: data.name,
          subname: data.subname,
          subsubname: data.subsubname,
          photo: null,
          info: data.info,
        })
        .then(() => {
          setIsLoading(false);
          toast.success('История отправлена!');
          router.refresh();
          router.push('/');
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:p-0 p-4">
      <div className="flex md:flex-row flex-col flex-1 gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Фамилия"
          required
          disabled={isLoading}
          className="border-2 border-neutral-300 text-2xl rounded-lg p-2  w-full "
          {...register('subname')}
        />
        <input
          type="text"
          placeholder="Имя"
          required
          disabled={isLoading}
          className="border-2 border-neutral-300 text-2xl rounded-lg p-2  w-full "
          {...register('name')}
        />
        <input
          type="text"
          placeholder="Отчество"
          required
          disabled={isLoading}
          className="border-2 border-neutral-300 text-2xl rounded-lg p-2  w-full "
          {...register('subsubname')}
        />
      </div>
      <textarea
        placeholder="Расскажите о вашем человеке"
        disabled={isLoading}
        className="border-2 border-neutral-300 text-lg rounded-lg p-2"
        {...register('info')}
      ></textarea>
      <input
        type="file"
        className="border-2 border-neutral-300 rounded-lg p-2"
        disabled={isLoading}
        accept="image/png, image/webp, image/jpeg, image/jpg"
        {...register('photo')}
      />
      <p>Максимальный размер: 3 мб.</p>
      {isFileTooBig && <p className="text-lg text-red-500">Файл слишком большой!</p>}
      {prevImage && (
        <div className=" flex flex-col justify-center items-center ">
          <div className="relative w-[280px] h-[400px] border-2 border-neutral-300 rounded-lg">
            <Image
              src={prevImage}
              fill
              alt="preview"
              className="object-cover rounded-md overflow-hidden"
            />
          </div>
        </div>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className="border-2 border-neutral-300 rounded-lg p-2 hover:bg-gray-100 transition disabled:opacity-70"
      >
        Отправить
      </button>
    </form>
  );
};

export default CreateStoryForm;
