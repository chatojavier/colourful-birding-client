import { useState } from 'react';
import axios from 'axios';
import Button from 'components/Button';
import SectionSubtitle from 'components/SectionSubtitle';
import SectionTitle from 'components/SectionTitle';
import Modal from 'components/Modal';
import { TextInput } from 'components/FormInputs';
import { useForm } from 'react-hook-form';
import Loader from 'components/Loader';

const SectionNewsletter = () => {
  const { register, handleSubmit, formState, trigger } = useForm();
  const [serverError, setServerError] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const onSubmit = async (formData, e) => {
    e.preventDefault();
    try {
      await axios.post('/api/subscribe', { email: formData.email });
    } catch (e) {
      setServerError(e.response.data.error);
    }
  };

  return (
    <section className="section-newsletter | | h-[375px] w-full bg-[url('/images/newsletter-background.webp')] bg-cover bg-center md:h-[480px] xl:h-[550px]">
      <div className="container mx-auto flex h-full max-w-[500px] flex-col items-center justify-center space-y-8 px-[12%] md:px-0">
        <div className="section-newsletter__header  w-full">
          <SectionTitle className="section-newsletter-title" color="white">
            Stay in Contact
          </SectionTitle>
          <SectionSubtitle className="section-newsletter-subtitle text-right text-white">Newsletter</SectionSubtitle>
        </div>
        <div className="section-newsletter-form w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            action="/?success=true"
            className="flex w-full items-center space-x-4"
          >
            <div className="form-group flex-grow">
              <TextInput
                id="email"
                type="email"
                autocomplete="email"
                placeholder="email"
                errorMessage={formState.errors.email?.message || serverError}
                {...register('email', {
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i,
                    message: 'Invalid email address',
                  },
                })}
                onBlur={() => trigger('email')}
                classNameInput="p-1 text-sm placeholder:text-xs placeholder:uppercase md:p-2 md:text-base md:placeholder:text-sm"
              />
            </div>
            <div className="form-group">
              <Button
                type="submit"
                className={`btn btn-primary ${formState.isSubmitting && 'bg-opacity-100 py-0 md:py-1'}`}
                color="white"
                disabled={formState.isSubmitting}
              >
                {formState.isSubmitting ? <Loader size="xs" /> : 'Send'}
              </Button>
            </div>
          </form>
        </div>
        {formState.isSubmitSuccessful && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="contact-form__success | p-8 text-center">
              <div className=" mb-4 font-bebas text-2xl md:text-3xl lg:text-4xl">Thank you for subscribing.</div>
            </div>
          </Modal>
        )}

        {serverError && (
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <div className="contact-form__success | p-8 text-center">
              <div className=" mb-4 font-bebas text-2xl text-lightblue md:text-3xl lg:text-4xl">
                {"It couldn't be submited."}
              </div>
              <div className="">{serverError}</div>
            </div>
          </Modal>
        )}
      </div>
    </section>
  );
};
export default SectionNewsletter;
