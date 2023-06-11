import React from 'react';
import CreateStoryForm from '@/components/CreateStoryForm';

const AddNewStory = () => {
  return (
    <section>
      <h1 className="text-gray-800 md:text-[42px] text-3xl md:mt-4 mt-0 md:mb-4 md:p-0 px-4 pt-4">
        Рассказать историю
      </h1>
      <CreateStoryForm />
    </section>
  );
};

export default AddNewStory;
