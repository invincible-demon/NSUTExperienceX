import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About NSUTExperienceX
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to <strong>NSUTExperienceX</strong> – a platform built by and for NSUTians to share real placement experiences. This project was created to help juniors learn from the interview journeys of their seniors.
            </p>

            <p>
              Seniors can post their placement stories across different categories such as technical rounds, HR interviews, and aptitude tests. These first-hand insights give juniors a clearer picture of what to expect during campus placements.
            </p>

            <p>
              Users can browse experiences by category, explore tips and company-specific strategies, and interact by liking and replying to shared stories. NSUTExperienceX aims to build a helpful, supportive space for placement preparation.
            </p>
          </div>
        </div>
        {/* <div className='mt-10'>
      <CallToAction />
    </div> */}
      </div>
    </div>

  );
}