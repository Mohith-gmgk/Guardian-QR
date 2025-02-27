import React from 'react';
import { Shield, Lock, AlertTriangle, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
              About Vahan Guard
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Protecting vehicles and their owners through innovative QR technology.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Enhancing Vehicle Security and Owner Convenience
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Vahan Guard was created with a simple mission: to provide vehicle owners with a secure, 
              convenient way to manage emergency situations, parking issues, and payments.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Security First</h3>
                  <p className="mt-2 text-base text-gray-500">
                    We prioritize the security of your personal information. Your vehicle details are only 
                    revealed after proper verification through situation-specific image uploads.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <AlertTriangle className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Emergency Response</h3>
                  <p className="mt-2 text-base text-gray-500">
                    In emergency situations, every second counts. Our QR system allows first responders 
                    to quickly access your information after proper verification.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Lock className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Privacy Protection</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Your privacy matters. We've implemented strict verification processes to ensure 
                    only authorized personnel can access your information in legitimate situations.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <Users className="h-6 w-6" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Community Building</h3>
                  <p className="mt-2 text-base text-gray-500">
                    We're building a community of responsible vehicle owners who prioritize safety and 
                    security. Join us in creating a safer environment for all.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How We Started Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Story</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              How Vahan Guard Started
            </p>
          </div>
          
          <div className="mt-10">
            <div className="prose prose-indigo prose-lg text-gray-500 mx-auto">
              <p>
                Vahan Guard was born out of a personal experience. Our founder experienced a situation where 
                their parked car was blocking another vehicle, but there was no way for the blocked driver to 
                contact them. This incident highlighted a common problem faced by vehicle owners and sparked 
                the idea for a secure, QR-based solution.
              </p>
              <p>
                We recognized that similar issues arise in various scenarios - from parking disputes to 
                accidents where emergency responders need quick access to vehicle owner information. However, 
                we also understood the importance of protecting personal data from unauthorized access.
              </p>
              <p>
                After months of development and testing, we created Vahan Guard - a system that balances 
                accessibility with security through our unique verification process that requires situation-specific 
                image uploads before revealing owner details.
              </p>
              <p>
                Today, Vahan Guard serves thousands of vehicle owners across the country, providing peace of 
                mind and practical solutions for everyday vehicle-related challenges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The People Behind Vahan Guard
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our diverse team of security experts, developers, and customer support specialists work 
              together to provide you with the best vehicle security solution.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-2">
                <img className="object-cover shadow-lg rounded-lg" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Team member" />
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Rajesh Kumar</h3>
                  <p className="text-indigo-600">Founder & CEO</p>
                </div>
                <div className="text-base">
                  <p className="text-gray-500">Passionate about vehicle security and technology innovation.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-2">
                <img className="object-cover shadow-lg rounded-lg" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Team member" />
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Priya Sharma</h3>
                  <p className="text-indigo-600">Head of Security</p>
                </div>
                <div className="text-base">
                  <p className="text-gray-500">Expert in cybersecurity with a focus on data protection.</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="aspect-w-3 aspect-h-2">
                <img className="object-cover shadow-lg rounded-lg" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Team member" />
              </div>
              <div className="space-y-2">
                <div className="text-lg leading-6 font-medium space-y-1">
                  <h3>Amit Patel</h3>
                  <p className="text-indigo-600">Lead Developer</p>
                </div>
                <div className="text-base">
                  <p className="text-gray-500">Full-stack developer with expertise in secure application development.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;