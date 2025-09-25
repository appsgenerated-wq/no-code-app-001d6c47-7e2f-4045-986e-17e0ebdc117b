import React from 'react';
import { FireIcon, SparklesIcon, ChartBarIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin, isLoading }) => {

  const handleDemoLogin = (e) => {
    e.preventDefault();
    onLogin('user@manifest.build', 'password');
  }

  const features = [
    {
      name: 'Catalog Your Varieties',
      description: 'Keep a detailed record of every tomato variety you grow, from heirlooms to hybrids.',
      icon: FireIcon,
    },
    {
      name: 'Track Tasting Notes',
      description: 'Rate flavor, texture, and sweetness. Never forget which tomato was your favorite.',
      icon: SparklesIcon,
    },
    {
      name: 'Visualize Your Garden',
      description: 'Upload photos and watch your tomato collection grow season after season.',
      icon: ChartBarIcon,
    },
  ];

  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center">
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=blue&shade=600" alt="" />
              <span className="ml-2 text-xl font-bold text-gray-900">TomatoTracker</span>
            </a>
          </div>
        </nav>
      </header>

      <main>
        <div className="relative isolate pt-14">
          <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
          <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Your Personal Tomato Encyclopedia</h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">From garden to table, track every tomato you grow. Catalog varieties, rate flavors, and build your ultimate tomato collection.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <button
                    onClick={handleDemoLogin}
                    disabled={isLoading}
                    className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors disabled:bg-blue-300"
                  >
                    {isLoading ? 'Logging in...' : 'Get started with a Demo'}
                  </button>
                  <a href="/admin" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold leading-6 text-gray-900">Admin Panel <span aria-hidden="true">→</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-blue-600">Everything You Need</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">A Better Way to Garden</p>
              <p className="mt-6 text-lg leading-8 text-gray-600">Stop using scattered notes and spreadsheets. TomatoTracker brings all your tomato information into one beautiful, easy-to-use application.</p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
           <p className="text-center text-xs leading-5 text-gray-500">&copy; 2023 TomatoTracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
