'use client';

const NewsletterSection = () => {
  return (
    <section className="bg-[url('/images/newsletter-bg1.jpg')] bg-cover bg-center py-20">
  <div className="bg-white max-w-sm sm:max-w-md mx-auto p-6 rounded-lg shadow-lg text-center w-[95%]">
    <h3 className="text-sm font-semibold tracking-widest uppercase mb-2 text-black">
      Subscribe to our newsletters
    </h3>
    <p className="text-gray-600 text-sm mb-6">
      Be the first to know about our New Launches, Store Openings & More.
    </p>
    <div className="flex flex-col sm:flex-row gap-2">
      <input
        type="email"
        placeholder="Your e-mail"
        className="flex-grow border border-gray-300 px-4 py-2 rounded"
      />
      <button className="w-full sm:w-auto bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600">
        Subscribe
      </button>
    </div>
  </div>
</section>

  );
};

export default NewsletterSection;
