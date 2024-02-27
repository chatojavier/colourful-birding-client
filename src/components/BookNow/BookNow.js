import Button from 'components/Button';
import DateFromTo from 'components/DateFromTo';
import { DividerH, DividerV } from 'components/Divider';
import { Checkbox, TextArea, TextInput, PhoneInput } from 'components/FormInputs';
import GroupTitle from 'components/GroupTitle';
import useWindowSize from 'hooks/use-window-resize';
import { formatCurrency, getTextColorByName } from 'lib/util';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const BookNow = ({ price = 0, programedDates, color = 'lightblue', className = '' }) => {
  const [serverError, setServerError] = useState('');
  const { register, handleSubmit, formState, watch, control, trigger } = useForm({
    defaultValues: {
      dates: `From: ${programedDates.from} / to: ${programedDates.to}`,
      price: `USD ${formatCurrency(price)} per person`,
    },
  });
  const router = useRouter();

  const parseDataToNetlify = (data) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const onSubmit = (formData, event) => {
    fetch(`/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: parseDataToNetlify({ 'form-name': 'book-now', ...formData }),
    })
      .then(() => {
        router.push(
          {
            pathname: router.asPath,
            query: {
              successfully: true,
            },
          },
          undefined,
          { shallow: true }
        );
        setServerError('');
      })
      .catch((error) => {
        setServerError(error.message);
      });
    event.preventDefault();
  };

  const watchPeople = watch('people', 1);
  const [windowWidth] = useWindowSize();

  return (
    <>
      {!formState.isSubmitSuccessful ? (
        <form
          className={`book-now | max-h-[80vh] space-y-6 overflow-x-auto p-8 md:flex md:flex-row md:space-x-8 md:space-y-0 ${className}`}
          onSubmit={handleSubmit(onSubmit)}
          name="book-now"
          method="POST"
          action="contact/?success=true"
          data-netlify="true"
          netlify-honeypot="instagram"
        >
          <input type="hidden" name="form-name" value="book-now" />
          <input type="hidden" name="formId" value="book-now" {...register('formId')} />
          <div className="col-left | flex shrink-0 flex-col justify-between md:w-4/12">
            <div className="block-top | space-y-8">
              {programedDates && (
                <div className="book-now__dates">
                  <GroupTitle className={getTextColorByName(color)}>Dates</GroupTitle>
                  <DateFromTo from={programedDates.from} to={programedDates.to} onlyDuration />
                  <TextInput id="dates" {...register('dates')} aria-hidden="true" disabled className="hidden" />
                </div>
              )}
              <div className="book-now__people">
                <GroupTitle className={getTextColorByName(color)}>People</GroupTitle>
                <TextInput
                  id="people"
                  type="number"
                  min="1"
                  color={color}
                  errorMessage={formState.errors.people?.message}
                  {...register('people', {
                    required: 'A number is required',
                    value: 1,
                  })}
                  onBlur={() => trigger('people')}
                />
              </div>
              <div className="book-now__price">
                <GroupTitle className={getTextColorByName(color)}>Price</GroupTitle>
                <div className="price | font-bold">
                  <span className="currency">USD </span>
                  <span className="number">{formatCurrency(price * Number(watchPeople))}</span>
                </div>
                <TextInput id="price" {...register('price')} aria-hidden="true" disabled className="hidden" />
              </div>
            </div>
            <div className="block-bottom">
              <div className="book-now__accommodation | mt-8 text-xs uppercase">
                Accommodation details <span className={getTextColorByName(color)}>here</span>
              </div>
            </div>
          </div>

          {windowWidth < 768 ? <DividerH /> : <DividerV />}

          <div className="col-right | w-full space-y-6">
            <div>
              <GroupTitle className={getTextColorByName(color)}>Fullname</GroupTitle>
              <TextInput
                id="fullname"
                errorMessage={formState.errors.fullname?.message}
                {...register('fullname', {
                  required: 'Fullname is required',
                })}
                color={color}
                onBlur={() => trigger('fullname')}
              />
            </div>
            <div className="space-y-6 md:flex md:space-y-0 md:space-x-4">
              <div className="shrink-0">
                <GroupTitle className={getTextColorByName(color)}>Email</GroupTitle>
                <TextInput
                  id="email"
                  type="email"
                  errorMessage={formState.errors.email?.message}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  color={color}
                  onBlur={() => trigger('email')}
                />
              </div>
              <div>
                <GroupTitle className={getTextColorByName(color)}>Phone</GroupTitle>
                <PhoneInput
                  id="phone"
                  name="phone"
                  required
                  useFormMthods={{ control, trigger }}
                  errorMessage={formState.errors.phone?.type}
                  {...register('phone', { required: 'Phone is required' })}
                  color={color}
                />
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                overflow: 'hidden',
                clip: 'rect(0 0 0 0)',
                height: '1px',
                width: '1px',
                margin: '-1px',
                padding: '0',
                border: '0',
              }}
            >
              <label htmlFor="instagram">
                {"Don’t fill this out if you're human:"}
                <input tabIndex="-1" name="instagram" {...register('instagram')} autoComplete="off" />
              </label>
            </div>
            <div>
              <GroupTitle className={getTextColorByName(color)}>Comments</GroupTitle>
              <TextArea
                id="message"
                errorMessage={formState.errors.message?.message}
                {...register('message', {
                  required: 'Message is required',
                })}
                color={color}
                onBlur={() => trigger('message')}
              />
            </div>
            <div className="flex justify-between space-x-4">
              <Checkbox
                id="policies"
                errorMessage={formState.errors.policies?.message}
                label={
                  <>
                    I have read and accept
                    <br />
                    the{' '}
                    <Link href="/privacy-policy">
                      <a className={getTextColorByName(color)}>privacy policies</a>
                    </Link>
                  </>
                }
                {...register('policies', {
                  required: 'You should accept the privacy policies',
                })}
                onBlur={async () => {
                  await trigger('policies');
                }}
              />
              <div>
                <Button
                  className="inline-block shadow active:shadow-none"
                  type="submit"
                  disabled={formState.isSubmitting}
                  color={color}
                  filled={true}
                  onClick={() => console.log(formState.errors)}
                >
                  {formState.isSubmitting ? 'Sending...' : 'Send'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      ) : !serverError ? (
        <div className="contact-form__success | p-8 text-center">
          <div className=" mb-4 font-bebas text-2xl text-lightblue md:text-3xl lg:text-4xl">
            Thank you for your message.
          </div>
          <div className="">We will get back to you as soon as possible.</div>
        </div>
      ) : (
        <div className="contact-form__success | p-8 text-center">
          <div className=" mb-4 font-bebas text-2xl text-lightblue md:text-3xl lg:text-4xl">
            {"It couldn't be submited."}
          </div>
          <div className="">{serverError}</div>
        </div>
      )}
    </>
  );
};
export default BookNow;
