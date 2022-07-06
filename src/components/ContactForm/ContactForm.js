import Button from 'components/Button';
import { TextInput, TextArea } from 'components/FormInputs';
import Modal from 'components/Modal';
import { useForm } from 'react-hook-form';

const ContactForm = ({ className }) => {
  const { register, handleSubmit, formState } = useForm();
  const onSubmit = (data, e) => console.log(data, e);

  console.log(formState);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`contact-form | space-y-6 p-4 ${className}`}>
      <TextInput
        id="name"
        label="Name"
        autocomplete="name"
        errorMessage={formState.errors.name?.message}
        {...register('name', {
          required: 'Name is required',
        })}
      />
      <div className="flex w-full flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
        <TextInput
          id="email"
          label="Email"
          type="email"
          autocomplete="email"
          errorMessage={formState.errors.email?.message}
          {...register('email', {
            required: 'Email is required',
          })}
        />
        <TextInput
          id="phone"
          label="Phone"
          type="tel"
          autocomplete="tel"
          errorMessage={formState.errors.phone?.message}
          {...register('phone', {
            pattern: {
              value: /^\d{3}-\d{3}-\d{4}$/,
              message: 'Phone number must be in the format ###-###-####',
            },
          })}
        />
      </div>

      <TextArea
        id="message"
        label="Your Comments"
        errorMessage={formState.errors.message?.message}
        {...register('message', {
          required: 'Message is required',
        })}
      />

      <Button className="block shadow active:shadow-none" type="submit" disabled={formState.isSubmitting} color="green">
        {formState.isSubmitting ? 'Sending...' : 'Send'}
      </Button>

      {formState.isSubmitSuccessful && (
        <Modal>
          <div className="contact-form__success | p-8 text-center">
            <div className=" mb-4 font-bebas text-2xl md:text-3xl lg:text-4xl">Thank you for your message.</div>
            <div className="">We will get back to you as soon as possible.</div>
          </div>
        </Modal>
      )}

      {formState.isValid && <div className="contact-form__error">{formState.errorMessage}</div>}
    </form>
  );
};

export default ContactForm;
