'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";

import useRentModal from '@/app/hooks/useRentModal';

import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import Dates from '../inputs/Dates';

enum STEPS {
  TITLE = 0,
  CATEGORY = 1,
  LOCATION = 2,
  INFO = 3,
  DESCRIPTION = 4,
  IMAGES = 5,
  DATES = 6,
  PRICE = 7,
}

const RentModal = () => {
  const router = useRouter();
  const rentModal = useRentModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.TITLE);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      guestCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
      latitude: null,
      longitude: null,
      completeAddress: '',
    },
  });

  const location = watch('location');
  const category = watch('category');
  const guestCount = watch('guestCount');
  const imageSrc = watch('imageSrc');
  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      onNext();
      return;
    }

    data.latitude = location?.latlng[0];
    data.longitude = location?.latlng[1];

    setIsLoading(true);

    try {
      await axios.post('/api/listings', data);
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.TITLE);
      rentModal.onClose();
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  let bodyContent;

  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Listing Category" subtitle="Pick a category that best described your Listing" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
            {categories.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      );
      break;
    case STEPS.LOCATION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Enter your listings location" subtitle="Help people find you!" />
          <CountrySelect value={location} onChange={(value) => setCustomValue('location', value)} />
          <Map center={location?.latlng} />
        </div>
      );
      break;
    case STEPS.INFO:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Share some basics about your listing" subtitle="Important information, dates and anything that would help users understand your listing" />
          <Counter onChange={(value) => setCustomValue('guestCount', value)} value={guestCount} title="Guests" subtitle="How many guests do you allow?" />
        </div>
      );
      break;
    case STEPS.IMAGES:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Add a thumbnail" subtitle="Show the best your Listing has to offer!" />
          <ImageUpload onChange={(value) => setCustomValue('imageSrc', value)} value={imageSrc} />
        </div>
      );
      break;
    case STEPS.DESCRIPTION:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="How would you describe your place?" subtitle="Short and sweet works best!" />
          <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
        </div>
      );
      break;
    case STEPS.TITLE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Please enter a Title for your Listing" subtitle="Short and sweet works best!" />
          <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
        </div>
      );
      break;
    case STEPS.DATES:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Select the Dates" subtitle="When is your listing available?" />
          <Dates register={register} errors={errors} />
        </div>
      );
      break;
    case STEPS.PRICE:
      bodyContent = (
        <div className="flex flex-col gap-8">
          <Heading title="Now, set your price" subtitle="How much do you charge per seat?" />
          <Input id="price" label="Price" formatPrice type="number" disabled={isLoading} register={register} errors={errors} required />
        </div>
      );
      break;
    default:
      break;
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={rentModal.isOpen}
      title="Create a Listing!"
      actionLabel={step === STEPS.PRICE ? 'Create' : 'Next'}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={step === STEPS.TITLE ? undefined : 'Back'}
      secondaryAction={step === STEPS.TITLE ? undefined : onBack}
      onClose={rentModal.onClose}
      body={bodyContent}
    />
  );
};

export default RentModal;