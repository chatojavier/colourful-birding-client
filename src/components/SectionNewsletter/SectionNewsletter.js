import Button from 'components/Button';
import InputText from 'components/InputText';
import SectionSubtitle from 'components/SectionSubtitle';
import SectionTitle from 'components/SectionTitle';

const SectionNewsletter = () => {
  return (
    <section className="section-newsletter | | h-[375px] w-full bg-[url('/images/newsletter-background.webp')] bg-cover bg-center md:h-[480px] xl:h-[550px]">
      <div className="container mx-auto flex h-full max-w-[800px] flex-col items-center justify-center space-y-8 px-[12%]">
        <div className="section-newsletter__header  w-full">
          <SectionTitle className="section-newsletter-title" color="white">
            Stay in Contact
          </SectionTitle>
          <SectionSubtitle className="section-newsletter-subtitle text-right text-white">Newsletter</SectionSubtitle>
        </div>
        <div className="section-newsletter-form w-full">
          <form action="" className="flex w-full items-center space-x-4">
            <div className="form-group flex-grow">
              <InputText type="text" className="form-control w-full" placeholder="Email" />
            </div>
            <div className="form-group">
              <Button type="submit" className="btn btn-primary" color="white">
                send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default SectionNewsletter;
