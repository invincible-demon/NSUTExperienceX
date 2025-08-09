import CallToAction from '../components/CallToAction';

export default function About() {
  return (
    /*
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Sahand's Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Sahand's Blog! This blog was created by Sahand Ghavidel
              as a personal project to share his thoughts and ideas with the
              world. Sahand is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
        <div className='mt-10'>
          <CallToAction />
        </div>
      </div>
    </div>
    */
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